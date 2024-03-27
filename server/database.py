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
