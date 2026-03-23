from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.stock_movement import StockMovementCreate, StockMovementOut, StockMovementUpdate
from .auth import get_current_user

router = APIRouter(prefix="/stock-movements", tags=["Stock Movements"])

@router.post("/", response_model=StockMovementOut, status_code=status.HTTP_201_CREATED)
def create_stock_movement(payload: StockMovementCreate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    movement = models.stock_movement.StockMovement(**payload.dict(), user_id=current_user.id)
    db.add(movement)
    db.commit()
    db.refresh(movement)
    return movement

@router.get("/", response_model=List[StockMovementOut])
def list_stock_movements(db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    return db.query(models.stock_movement.StockMovement).filter(models.stock_movement.StockMovement.user_id == current_user.id).all()

@router.get("/{movement_id}", response_model=StockMovementOut)
def get_stock_movement(movement_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    movement = db.query(models.stock_movement.StockMovement).filter(models.stock_movement.StockMovement.id == movement_id, models.stock_movement.StockMovement.user_id == current_user.id).first()
    if not movement:
        raise HTTPException(status_code=404, detail="Stock movement not found")
    return movement

@router.delete("/{movement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stock_movement(movement_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    movement = db.query(models.stock_movement.StockMovement).filter(models.stock_movement.StockMovement.id == movement_id, models.stock_movement.StockMovement.user_id == current_user.id).first()
    if not movement:
        raise HTTPException(status_code=404, detail="Stock movement not found")
    db.delete(movement)
    db.commit()
    return
