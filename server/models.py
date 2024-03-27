class FavoriteRepo:
    def __init__(self, owner_avatar_url: str, html_url: str, name: str, description: str, stargazers_count: int):
        self.owner_avatar_url = owner_avatar_url
        self.html_url = html_url
        self.name = name
        self.description: description
        self.stargazers_count = stargazers_count