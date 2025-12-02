from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models
from ..schemas.staff import StaffCreate, StaffOut, StaffUpdate

router = APIRouter(prefix="/staff", tags=["Staff"])

@router.post("/", response_model=StaffOut, status_code=status.HTTP_201_CREATED)
def create_staff(payload: StaffCreate, db: Session = Depends(get_db)):
    existing = db.query(models.staff.Staff).filter(models.staff.Staff.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    staff = models.staff.Staff(**payload.dict())
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff

@router.get("/", response_model=List[StaffOut])
def list_staff(db: Session = Depends(get_db)):
    return db.query(models.staff.Staff).all()

@router.get("/{staff_id}", response_model=StaffOut)
def get_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(models.staff.Staff).get(staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff

@router.patch("/{staff_id}", response_model=StaffOut)
def update_staff(staff_id: int, payload: StaffUpdate, db: Session = Depends(get_db)):
    staff = db.query(models.staff.Staff).get(staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(staff, field, value)

    db.commit()
    db.refresh(staff)
    return staff

@router.delete("/{staff_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(models.staff.Staff).get(staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    db.delete(staff)
    db.commit()
    return
