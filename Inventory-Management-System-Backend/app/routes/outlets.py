from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.outlet import OutletCreate, OutletOut, OutletUpdate

router = APIRouter(prefix="/outlets", tags=["Outlets"])

@router.post("/", response_model=OutletOut, status_code=status.HTTP_201_CREATED)
def create_outlet(payload: OutletCreate, db: Session = Depends(get_db)):
    outlet = models.outlet.Outlet(**payload.dict())
    db.add(outlet)
    db.commit()
    db.refresh(outlet)
    return outlet

@router.get("/", response_model=List[OutletOut])
def list_outlets(db: Session = Depends(get_db)):
    return db.query(models.outlet.Outlet).all()

@router.get("/{outlet_id}", response_model=OutletOut)
def get_outlet(outlet_id: int, db: Session = Depends(get_db)):
    outlet = db.query(models.outlet.Outlet).get(outlet_id)
    if not outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
    return outlet

@router.patch("/{outlet_id}", response_model=OutletOut)
def update_outlet(outlet_id: int, payload: OutletUpdate, db: Session = Depends(get_db)):
    outlet = db.query(models.outlet.Outlet).get(outlet_id)
    if not outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(outlet, field, value)

    db.commit()
    db.refresh(outlet)
    return outlet

@router.delete("/{outlet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_outlet(outlet_id: int, db: Session = Depends(get_db)):
    outlet = db.query(models.outlet.Outlet).get(outlet_id)
    if not outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
    db.delete(outlet)
    db.commit()
    return
