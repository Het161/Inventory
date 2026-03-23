from app.database import SessionLocal, engine
from app.models import Base
import sqlalchemy

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
print("Database reset completely.")
