from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import favorites

# Initialize server instance
app = FastAPI()

# Allow for server to talk to client at these ports
origins = [
    "http://localhost:3000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router condenses routes to the same endpoint
app.include_router(favorites.router)

