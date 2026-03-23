import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from backend root directory
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings:
    PROJECT_NAME: str = "OM Marketing Solutions Inventory API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./inventory.db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "om-marketing-solutions-secret-key-2026")
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")

settings = Settings()

