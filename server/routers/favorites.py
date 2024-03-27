from fastapi import APIRouter, Response, HTTPException
# from .. import schemas
# # from . import db

from pydantic import BaseModel
from typing import List

class RepoIn(BaseModel):
    id: int
    owner_avatar_url: str
    html_url: str
    name: str
    description: str
    stargazers_count: int

class RepoOut(BaseModel):
    id: int
    owner_avatar_url: str
    html_url: str
    name: str
    description: str
    stargazers_count: int

class FavRepo:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)


class Database:
    def __init__(self):
        self.data = []

    def insert(self, repo):
        self.data.append(repo)
    
    def getById(self, id):
        
        for repo in self.data:
            if repo.id == id:
                return repo
        
        print(f"Repository with {id} not found")
        return None
    
    def delete(self, repo):
        
        if repo:
            self.data.remove(repo)
            print(f"Repository was successfully deleted")
            return repo
        else:
            print(f"Repository does not exist")
            return None

    # Surface level methods to mock database operations
    def connect(self):
        print('Database connection successful')

    def commit(self):
        print('Data successfully committed to database')

    def close(self):
        print('Database connection closed successfully')


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
    # Returns whatever data is currently in the database, even if it's empty
    repos = db.data
    return repos

@router.post("/", status_code=201, response_model=RepoOut)
def add_favorites(repo: RepoIn):
    new_repo = FavRepo(**repo.model_dump())
    
    # If repo is already in database, raise exception and return it
    if db.getById(new_repo.id):
        raise HTTPException(status_code=204, detail=f"Repository with id: {new_repo.id} is already favorited")
    
    # Adds to the list of favorited repositories
    db.insert(new_repo)
    db.commit()

    return new_repo

@router.delete("/:{id}", status_code=201, response_model=RepoOut)
def delete_favorites(id: int):

    # Uses a method specified in database class to check if the repo already exists
    repo = db.getById(id)

    # If repo doesn't exist database, raise exception and return it
    if repo == None:
        raise HTTPException(status_code=404, detail=f"Repository with id: {id} was not found")
    
    # Removes the favorited repository from the database
    deleted_repo = db.delete(repo)
    db.commit()

    return deleted_repo


