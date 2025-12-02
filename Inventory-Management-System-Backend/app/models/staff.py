from sqlalchemy import Column, Integer, String, Float, Date
from datetime import date
from ..database import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50), nullable=False)
    role = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    salary = Column(Float, nullable=False)
    join_date = Column(Date, default=date.today)
    status = Column(String(50), default="Active")
