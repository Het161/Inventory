import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Web Your Vyavsay Inventory API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./inventory.db")

settings = Settings()
