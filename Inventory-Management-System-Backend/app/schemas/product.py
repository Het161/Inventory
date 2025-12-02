from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    sku: str
    category: str
    stock: int
    min_stock: int
    price: float
    status: str = "In Stock"
    image_url: Optional[str] = ""
    description: Optional[str] = ""

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    min_stock: Optional[int] = None
    price: Optional[float] = None
    status: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None

class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True
