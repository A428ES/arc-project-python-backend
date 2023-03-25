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
        db_entry['is_deleted'] = False

        return db_entry

    def find_record(self, target, query):
        self.set_collection(target)

        result = [entry for entry in self.collection.find(query)]

        return result if len(result) > 0 else None

    def insert_record(self, target, db_entry):
        db_entry = self.inject_tracking_requirements(db_entry)

        self.set_collection(target)
        self.collection.insert_one(self.inject_tracking_requirements(db_entry))

        return self.find_record(target, {'uuid':db_entry['uuid']})
    
    def update_record(self, target, db_entry, delete_record=False):
        self.set_collection(target)

        if self.find_record({'uuid':db_entry['uuid']}) == None:
            return None
        
        if delete_record == True:
            db_entry['is_deleted'] = True

        self.collection.replace_one(db_entry)

        return self.find_record({'uuid':db_entry['uuid']})