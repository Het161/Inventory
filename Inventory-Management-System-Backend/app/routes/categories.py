from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import List

from ..database import get_db
from .. import models
from ..schemas.category import CategoryCreate, CategoryOut, CategoryUpdate
from .auth import get_current_user

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("/summary")
def get_categories_summary(db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    """Get categories derived from products with counts"""
    results = db.query(
        models.product.Product.category,
        func.count(models.product.Product.id).label("product_count"),
        func.coalesce(func.sum(models.product.Product.stock), 0).label("total_stock"),
        func.sum(
            case(
                (models.product.Product.stock < models.product.Product.min_stock, 1),
                else_=0
            )
        ).label("low_stock_items")
    ).filter(models.product.Product.user_id == current_user.id).group_by(models.product.Product.category).all()

    return [
        {
            "id": idx + 1,
            "name": r.category,
            "product_count": r.product_count,
            "total_stock": r.total_stock,
            "low_stock_items": r.low_stock_items,
        }
        for idx, r in enumerate(results)
    ]

@router.post("/", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    category = models.category.Category(**payload.dict(), user_id=current_user.id)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get("/", response_model=List[CategoryOut])
def list_categories(db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    return db.query(models.category.Category).filter(models.category.Category.user_id == current_user.id).all()

@router.get("/{category_id}", response_model=CategoryOut)
def get_category(category_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    category = db.query(models.category.Category).filter(models.category.Category.id == category_id, models.category.Category.user_id == current_user.id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.patch("/{category_id}", response_model=CategoryOut)
def update_category(category_id: int, payload: CategoryUpdate, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    category = db.query(models.category.Category).filter(models.category.Category.id == category_id, models.category.Category.user_id == current_user.id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return category

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db), current_user: models.user.User = Depends(get_current_user)):
    category = db.query(models.category.Category).filter(models.category.Category.id == category_id, models.category.Category.user_id == current_user.id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()
    return
