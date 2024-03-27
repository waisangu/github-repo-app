class Database:
    def __init__(self):
        self.data = {}

    def insert(self, key, value):
        self.data[key] = value
    
    def get(self, key):
        return self.data.get(key)
    
    def delete(self, key):
        if key in self.data:
            del self.data[key]
        else:
            print(f"Key: '{key} does not exist.")
    
    def connect(self):
        print('Database connection successful')

    def close(self):
        print('Database connection closed successfully')


db = Database()

def get_db():
    try:
        yield db
    finally:
        db.close()