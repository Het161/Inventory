from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..database import Base

class StockMovement(Base):
    __tablename__ = "stock_movements"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String(50), nullable=False)
    product = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # "Stock In" or "Stock Out"
    quantity = Column(Integer, nullable=False)
    reference = Column(String(100), default="")
    user = Column(String(100), default="Admin")
    created_at = Column(DateTime, default=datetime.utcnow)
