from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
import json

router = APIRouter(prefix="/preferences", tags=["preferences"])

@router.get("/")
async def get_preferences(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get user preferences"""
    # Fetch from database
    user_prefs = db.query(UserPreferences).filter(UserPreferences.user_id == current_user["id"]).first()
    
    if not user_prefs:
        # Return defaults
        return {
            "theme": "light",
            "currency": "USD",
            "language": "en",
            "dateFormat": "MM/DD/YYYY",
            "timezone": "Asia/Kolkata",
            "numberFormat": "comma",
            "displayDensity": "comfortable",
            "emailNotifications": True,
            "pushNotifications": False,
            "lowStockAlerts": True,
            "weekStart": "monday"
        }
    
    return json.loads(user_prefs.preferences_json)

@router.put("/")
async def update_preferences(
    preferences: Dict[str, Any],
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user preferences"""
    user_prefs = db.query(UserPreferences).filter(UserPreferences.user_id == current_user["id"]).first()
    
    if not user_prefs:
        user_prefs = UserPreferences(user_id=current_user["id"])
        db.add(user_prefs)
    
    user_prefs.preferences_json = json.dumps(preferences)
    user_prefs.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Preferences updated successfully"}
