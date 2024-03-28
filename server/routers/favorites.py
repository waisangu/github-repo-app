import sys
from pathlib import Path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from fastapi import APIRouter, HTTPException
from typing import List
from schemas import RepoIn, RepoOut
from models import FavRepo
from database import Database

# Initialize mock database instance
db = Database()

# Added the prefix so that it is not required in path of the decorator 
# Tags is only usedfor OpenAPI "/docs" enpoint
router = APIRouter(
    prefix='/favorites',
    tags=['Favorites']
)

# Status code and response model are automatically handled if specified in decorator of each route
# Response model uses pydantic for data validation purposes
@router.get("/", status_code=200, response_model=List[RepoOut])
def get_favorites():
    try:
        # Returns whatever data is currently in the database, even if it's empty
        repos = db.get_all()
        return repos
    except Exception as e:
        raise HTTPException(status_code=500, detail=f" Error: {e}. Failed to get all repositories.")

@router.post("/", status_code=201, response_model=RepoOut)
def add_favorites(repo: RepoIn):
    try:
        new_repo = FavRepo(**repo.model_dump())
        # If repo is already in database, raise exception and return it
        if db.get_by_id(new_repo.id):
            raise HTTPException(status_code=409, detail=f"Repository with id: {new_repo.id} is already favorited")
    
        # Adds to the list of favorited repositories
        db.insert(new_repo)
        db.commit()
        return new_repo
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f" Error: {e}. Failed to get add repository.")

@router.delete("/:{id}", status_code=201, response_model=RepoOut)
def delete_favorites(id: int):
    try:
        # Uses a method specified in database class to check if the repo already exists
        repo = db.get_by_id(id)

        # If repo doesn't exist database, raise exception and return it
        if repo == None:
            raise HTTPException(status_code=404, detail=f"Repository with id: {id} was not found")
        
        # Removes the favorited repository from the database
        deleted_repo = db.delete(repo)
        db.commit()
        return deleted_repo
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}. Failed to get delete repository.")


