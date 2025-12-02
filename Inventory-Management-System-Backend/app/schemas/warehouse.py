from pydantic import BaseModel
from typing import Optional

class WarehouseBase(BaseModel):
    name: str
    location: str
    capacity: int
    current_stock: int = 0
    manager: Optional[str] = None
    status: str = "Active"

class WarehouseCreate(WarehouseBase):
    pass

class WarehouseUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    current_stock: Optional[int] = None
    manager: Optional[str] = None
    status: Optional[str] = None

class WarehouseOut(WarehouseBase):
    id: int

    class Config:
        from_attributes = True
