from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.stock_movement import StockMovementCreate, StockMovementOut, StockMovementUpdate

router = APIRouter(prefix="/stock-movements", tags=["Stock Movements"])

@router.post("/", response_model=StockMovementOut, status_code=status.HTTP_201_CREATED)
def create_stock_movement(payload: StockMovementCreate, db: Session = Depends(get_db)):
    movement = models.stock_movement.StockMovement(**payload.dict())
    db.add(movement)
    db.commit()
    db.refresh(movement)
    return movement

@router.get("/", response_model=List[StockMovementOut])
def list_stock_movements(db: Session = Depends(get_db)):
    return db.query(models.stock_movement.StockMovement).all()

@router.get("/{movement_id}", response_model=StockMovementOut)
def get_stock_movement(movement_id: int, db: Session = Depends(get_db)):
    movement = db.query(models.stock_movement.StockMovement).get(movement_id)
    if not movement:
        raise HTTPException(status_code=404, detail="Stock movement not found")
    return movement

@router.delete("/{movement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stock_movement(movement_id: int, db: Session = Depends(get_db)):
    movement = db.query(models.stock_movement.StockMovement).get(movement_id)
    if not movement:
        raise HTTPException(status_code=404, detail="Stock movement not found")
    db.delete(movement)
    db.commit()
    return
