from pydantic import BaseModel
from typing import Optional

class OutletBase(BaseModel):
    name: str
    location: str
    manager: str = ""
    staff_count: int = 0
    status: str = "Active"

class OutletCreate(OutletBase):
    pass

class OutletUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    manager: Optional[str] = None
    staff_count: Optional[int] = None
    status: Optional[str] = None

class OutletOut(OutletBase):
    id: int

    class Config:
        from_attributes = True
