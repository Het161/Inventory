from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class GoogleLogin(BaseModel):
    token: str  # Google id_token
    name: Optional[str] = None
    email: Optional[str] = None
    avatar: Optional[str] = None


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    auth_provider: str
    avatar: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
