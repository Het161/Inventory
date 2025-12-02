# from fastapi import FastAPI
# from .database import Base, engine
# from . import models
# from .routes import products, warehouses

# def create_tables():
#     Base.metadata.create_all(bind=engine)

# app = FastAPI(title="Web Your Vyavsay Inventory API")

# create_tables()

# app.include_router(products.router)
# app.include_router(warehouses.router)

# @app.get("/")
# def root():
#     return {"message": "Inventory API is running"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models
from .routes import products, warehouses, categories, customers, staff

def create_tables():
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="Web Your Vyavsay Inventory API")

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.get("/")
def root():
    return {"message": "Inventory API is running"}
