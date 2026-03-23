from sqlalchemy import Column, Integer, String, Float, ForeignKey
from ..database import Base

class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    capacity = Column(Integer, nullable=False)
    current_stock = Column(Integer, default=0)
    manager = Column(String(100))
    status = Column(String(50), default="Active")
