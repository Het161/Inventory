from sqlalchemy import Column, Integer, String
from ..database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(500))
    icon = Column(String(50))
    status = Column(String(50), default="Active")
