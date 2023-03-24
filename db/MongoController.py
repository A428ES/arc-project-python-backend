from pymongo import MongoClient

class MongoController:
    def __init__(self, db="admin", host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.db = self.get_db(db)

    def get_db(self, db_name):
        return self.client[db_name]
    
    def get_collection(self, collection):
        return self.db[collection]

