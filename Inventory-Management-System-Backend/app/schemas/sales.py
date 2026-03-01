from pydantic import BaseModel
from typing import Optional

class SalesMemoBase(BaseModel):
    memo_id: str
    date: str
    customer: str
    amount: float
    status: str = "Pending"

class SalesMemoCreate(SalesMemoBase):
    pass

class SalesMemoUpdate(BaseModel):
    memo_id: Optional[str] = None
    date: Optional[str] = None
    customer: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None

class SalesMemoOut(SalesMemoBase):
    id: int

    class Config:
        from_attributes = True
