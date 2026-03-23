from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.sales import SalesMemoCreate, SalesMemoOut, SalesMemoUpdate
from .auth import get_current_user

router = APIRouter(prefix="/sales", tags=["Sales"])

@router.post("/", response_model=SalesMemoOut, status_code=status.HTTP_201_CREATED)
def create_sales_memo(payload: SalesMemoCreate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    existing = db.query(models.sales.SalesMemo).filter(models.sales.SalesMemo.memo_id == payload.memo_id, models.sales.SalesMemo.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Memo ID already exists")

    memo = models.sales.SalesMemo(**payload.dict(), user_id=current_user.id)
    db.add(memo)
    db.commit()
    db.refresh(memo)
    return memo

@router.get("/", response_model=List[SalesMemoOut])
def list_sales_memos(db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    return db.query(models.sales.SalesMemo).filter(models.sales.SalesMemo.user_id == current_user.id).all()

@router.get("/{memo_id}", response_model=SalesMemoOut)
def get_sales_memo(memo_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    memo = db.query(models.sales.SalesMemo).filter(models.sales.SalesMemo.id == memo_id, models.sales.SalesMemo.user_id == current_user.id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Sales memo not found")
    return memo

@router.patch("/{memo_id}", response_model=SalesMemoOut)
def update_sales_memo(memo_id: int, payload: SalesMemoUpdate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    memo = db.query(models.sales.SalesMemo).filter(models.sales.SalesMemo.id == memo_id, models.sales.SalesMemo.user_id == current_user.id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Sales memo not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(memo, field, value)

    db.commit()
    db.refresh(memo)
    return memo

@router.delete("/{memo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sales_memo(memo_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    memo = db.query(models.sales.SalesMemo).filter(models.sales.SalesMemo.id == memo_id, models.sales.SalesMemo.user_id == current_user.id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Sales memo not found")
    db.delete(memo)
    db.commit()
    return
