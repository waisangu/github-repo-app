from pydantic import BaseModel

# Pydantic filters the data and validates it against these schemas
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