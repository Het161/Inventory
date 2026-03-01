from pydantic import BaseModel
from typing import Optional

class StockMovementBase(BaseModel):
    date: str
    product: str
    type: str
    quantity: int
    reference: str = ""
    user: str = "Admin"

class StockMovementCreate(StockMovementBase):
    pass

class StockMovementUpdate(BaseModel):
    date: Optional[str] = None
    product: Optional[str] = None
    type: Optional[str] = None
    quantity: Optional[int] = None
    reference: Optional[str] = None
    user: Optional[str] = None

class StockMovementOut(StockMovementBase):
    id: int

    class Config:
        from_attributes = True
