from pymongo import MongoClient
from db.mongo_schemas import MongoSchemas
from datetime import datetime
import uuid

class MongoController(MongoSchemas):
    def __init__(self, db="story_app_db", host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.db = self.client[db]
        self.collection = None
    
    def set_collection(self, collection):
        self.collection = self.db[collection]

    def inject_tracking_requirements(self, db_entry):
        db_entry['uuid'] = str(uuid.uuid4()),
        db_entry['ip_address'] = '127.0.0.1'
        db_entry['timestamp_ms'] = datetime.now().timestamp()

        return db_entry
