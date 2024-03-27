class FavRepo:
    def _init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)