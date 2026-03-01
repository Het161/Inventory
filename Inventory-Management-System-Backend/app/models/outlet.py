from sqlalchemy import Column, Integer, String
from ..database import Base

class Outlet(Base):
    __tablename__ = "outlets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    manager = Column(String(100), default="")
    staff_count = Column(Integer, default=0)
    status = Column(String(50), default="Active")
