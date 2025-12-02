from pydantic import BaseModel, EmailStr
from typing import Optional

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: Optional[str] = None
    customer_type: str = "Regular"
    total_orders: int = 0
    total_spent: float = 0.0
    status: str = "Active"

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    customer_type: Optional[str] = None
    total_orders: Optional[int] = None
    total_spent: Optional[float] = None
    status: Optional[str] = None

class CustomerOut(CustomerBase):
    id: int

    class Config:
        from_attributes = True
