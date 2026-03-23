
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models
from .routes import products, warehouses, categories, customers, staff, outlets, sales, stock_movements, auth
from .models import user  # Import to register User table

def create_tables():
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="OM Marketing Solutions Inventory API")

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

app.include_router(products.router)
app.include_router(warehouses.router)
app.include_router(categories.router)
app.include_router(customers.router)
app.include_router(staff.router)
app.include_router(outlets.router)
app.include_router(sales.router)
app.include_router(stock_movements.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Inventory API is running"}
