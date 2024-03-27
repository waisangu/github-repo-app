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