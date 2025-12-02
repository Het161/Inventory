from sqlalchemy import Column, Integer, String, Float
from ..database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50), nullable=False)
    address = Column(String(500))
    customer_type = Column(String(50), default="Regular")
    total_orders = Column(Integer, default=0)
    total_spent = Column(Float, default=0.0)
    status = Column(String(50), default="Active")
