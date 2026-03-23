from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.customer import CustomerCreate, CustomerOut, CustomerUpdate
from .auth import get_current_user

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.post("/", response_model=CustomerOut, status_code=status.HTTP_201_CREATED)
def create_customer(payload: CustomerCreate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    existing = db.query(models.customer.Customer).filter(models.customer.Customer.email == payload.email, models.customer.Customer.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    customer = models.customer.Customer(**payload.dict(), user_id=current_user.id)
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

@router.get("/", response_model=List[CustomerOut])
def list_customers(db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    return db.query(models.customer.Customer).filter(models.customer.Customer.user_id == current_user.id).all()

@router.get("/{customer_id}", response_model=CustomerOut)
def get_customer(customer_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    customer = db.query(models.customer.Customer).filter(models.customer.Customer.id == customer_id, models.customer.Customer.user_id == current_user.id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.patch("/{customer_id}", response_model=CustomerOut)
def update_customer(customer_id: int, payload: CustomerUpdate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    customer = db.query(models.customer.Customer).filter(models.customer.Customer.id == customer_id, models.customer.Customer.user_id == current_user.id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(customer, field, value)

    db.commit()
    db.refresh(customer)
    return customer

@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(customer_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    customer = db.query(models.customer.Customer).filter(models.customer.Customer.id == customer_id, models.customer.Customer.user_id == current_user.id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return
