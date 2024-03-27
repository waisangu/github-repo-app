from fastapi import APIRouter, Response, HTTPException
# from .. import schemas
# from ..database import get_db

from pydantic import BaseModel
from typing import List


class Repo(BaseModel):
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
    def _init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

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

    
    def connect(self):
        print('Database connection successful')

    def commit(self):
        print('Data successfully committed to database')

    def close(self):
        print('Database connection closed successfully')


db = Database()

router = APIRouter(
    prefix='/favorites',
    tags=['Favorites']
)

@router.get("/", status_code=200, response_model=List[RepoOut])
def get_favorites():
    repos = db.data
    return repos

@router.post("/", status_code=201)
def add_favorites(repo: Repo):
    new_repo = Repo(**repo.model_dump())
    db.insert(new_repo)
    db.commit()

    return new_repo

@router.delete("/:{id}", status_code=204)
def delete_favorites(id: int):

    repo = db.getById(id)
    if repo == None:
        raise HTTPException(status_code=404, detail=f"Repository with id: {id} was not found")
    
    deleted_repo = db.delete(repo)
    db.commit()

    return deleted_repo

