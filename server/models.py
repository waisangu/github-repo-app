# Simulates the tables for our database
# **kwargs allows for any number of key value pair
class FavRepo:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)