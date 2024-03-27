from pydantic import BaseModel


class Repo(BaseModel):
    owner_avatar_url: str
    html_url: str
    name: str
    description: str
    stargazers_count: int