from sqlalchemy import Column, Integer, String, Float, ForeignKey
from ..database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    stock = Column(Integer, default=0)
    min_stock = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    status = Column(String(50), default="In Stock")
    image_url = Column(String(500), default="")
    description = Column(String(1000), default="")
