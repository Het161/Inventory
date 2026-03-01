from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from ..database import Base

class SalesMemo(Base):
    __tablename__ = "sales_memos"

    id = Column(Integer, primary_key=True, index=True)
    memo_id = Column(String(50), unique=True, index=True, nullable=False)
    date = Column(String(50), nullable=False)
    customer = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(50), default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
