from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import Optional
from sqlalchemy.orm import Session
import hashlib
import hmac
import os
import json
import time
import base64
from datetime import datetime, timedelta

from ..database import get_db
from ..models.user import User
from ..schemas.auth import UserCreate, UserLogin, GoogleLogin, UserOut, TokenResponse
from ..config import settings
from ..email_service import send_welcome_email, send_login_email

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# --- JWT Helpers (no pyjwt dependency needed) ---

def _b64encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

def _b64decode(s: str) -> bytes:
    s += "=" * (4 - len(s) % 4)
    return base64.urlsafe_b64decode(s)

def create_jwt(payload: dict) -> str:
    header = _b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode())
    payload["exp"] = time.time() + 86400 * 7  # 7 days
    body = _b64encode(json.dumps(payload, default=str).encode())
    signature = hmac.new(settings.JWT_SECRET.encode(), f"{header}.{body}".encode(), hashlib.sha256).digest()
    sig = _b64encode(signature)
    return f"{header}.{body}.{sig}"

def decode_jwt(token: str) -> dict:
    try:
        parts = token.split(".")
        if len(parts) != 3:
            raise ValueError("Invalid token")
        header, body, sig = parts
        expected_sig = _b64encode(
            hmac.new(settings.JWT_SECRET.encode(), f"{header}.{body}".encode(), hashlib.sha256).digest()
        )
        if not hmac.compare_digest(sig, expected_sig):
            raise ValueError("Invalid signature")
        payload = json.loads(_b64decode(body))
        if payload.get("exp", 0) < time.time():
            raise ValueError("Token expired")
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# --- Password Helpers ---

def hash_password(password: str) -> str:
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
    return salt.hex() + ":" + key.hex()

def verify_password(password: str, hashed: str) -> bool:
    try:
        salt_hex, key_hex = hashed.split(":")
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(key_hex)
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False

# --- Routes ---

@router.post("/register", response_model=TokenResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        auth_provider="email",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Send welcome email (async-safe, won't crash if fails)
    try:
        send_welcome_email(user.email, user.name)
    except Exception as e:
        print(f"[AUTH] Welcome email error: {e}")

    # Return JWT
    token = create_jwt({"user_id": user.id, "email": user.email})
    return TokenResponse(
        access_token=token,
        user=UserOut.model_validate(user),
    )


@router.post("/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not user.password_hash:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Send welcome-back email on login
    try:
        send_login_email(user.email, user.name)
    except Exception as e:
        print(f"[AUTH] Login email error: {e}")

    token = create_jwt({"user_id": user.id, "email": user.email})
    return TokenResponse(
        access_token=token,
        user=UserOut.model_validate(user),
    )


@router.post("/google", response_model=TokenResponse)
def google_login(data: GoogleLogin, db: Session = Depends(get_db)):
    """Handle Google Sign-In. The frontend sends decoded user info."""
    if not data.email:
        raise HTTPException(status_code=400, detail="Email is required from Google login")

    # Find or create user
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        user = User(
            name=data.name or data.email.split("@")[0],
            email=data.email,
            auth_provider="google",
            avatar=data.avatar,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Send welcome email for new Google users too
        try:
            send_welcome_email(user.email, user.name)
        except Exception:
            pass
    else:
        # Update avatar if provided
        if data.avatar and not user.avatar:
            user.avatar = data.avatar
            db.commit()
        # Send welcome-back email for returning Google users
        try:
            send_login_email(user.email, user.name)
        except Exception:
            pass

    token = create_jwt({"user_id": user.id, "email": user.email})
    return TokenResponse(
        access_token=token,
        user=UserOut.model_validate(user),
    )


@router.get("/me", response_model=UserOut)
def get_current_user(token: str = "", authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    """Get current user from JWT token passed as query param or header."""
    actual_token = token
    if not actual_token and authorization and authorization.startswith("Bearer "):
        actual_token = authorization.split(" ")[1]
        
    if not actual_token:
        raise HTTPException(status_code=401, detail="Token required")
    payload = decode_jwt(actual_token)
    user = db.query(User).filter(User.id == payload.get("user_id")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
