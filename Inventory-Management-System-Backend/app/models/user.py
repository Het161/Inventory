from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True)  # Null for Google-only users
    auth_provider = Column(String, default="email")  # "email" or "google"
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
