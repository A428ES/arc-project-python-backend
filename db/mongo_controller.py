from pymongo import MongoClient
from db.mongo_schemas import MongoSchemas

class MongoController(MongoSchemas):
    def __init__(self, db="story_app_db", host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.db = self.client[db]
        self.collection = None
    
    def set_collection(self, collection):
        self.collection = self.db[collection]

    

