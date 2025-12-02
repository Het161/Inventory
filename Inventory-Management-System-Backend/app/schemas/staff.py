from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class StaffBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    role: str
    department: str
    salary: float
    join_date: date
    status: str = "Active"

class StaffCreate(StaffBase):
    pass

class StaffUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    salary: Optional[float] = None
    join_date: Optional[date] = None
    status: Optional[str] = None

class StaffOut(StaffBase):
    id: int

    class Config:
        from_attributes = True
