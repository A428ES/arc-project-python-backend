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
        db_entry["uuid"] = str(uuid.uuid4())
        db_entry["ip_address"] = "127.0.0.1"
        db_entry["created_timestamp_ms"] = datetime.now().timestamp()
        db_entry["modified_timestamp_ms"] = datetime.now().timestamp()
        db_entry["is_deleted"] = False

        return db_entry

    def find_record(self, target, query, first=True):
        self.set_collection(target)

        query.update({"is_deleted": False})
        result = [entry for entry in self.collection.find(query)]

        if len(result) < 1:
            return []

        return result[0] if first == True else result

    def insert_record(self, target, db_entry):
        db_entry = self.inject_tracking_requirements(db_entry)

        self.set_collection(target)
        self.collection.insert_one(self.inject_tracking_requirements(db_entry))

        return self.find_record(target, {"uuid": db_entry["uuid"]})

    def update_record(self, target, db_entry, delete_record=False):
        self.set_collection(target)
        find_rec = self.find_record(target, {"uuid": db_entry["uuid"]})

        if find_rec == None:
            return None

        if delete_record == True:
            db_entry["is_deleted"] = True

        self.collection.replace_one({"uuid": db_entry["uuid"]}, db_entry)

        return self.find_record(target, {"uuid": db_entry["uuid"]})

    def get_story_for_frontend(self, story):
        self.set_collection("stories")

        author = self.find_record("users", {"uuid": story["author_uuid"]})

        if author != None:
            return {
                "uuid": story["uuid"],
                "title": story["title"],
                "story": story["story"],
                "author": f"{author['first_name']} {author['last_name']}",
                "date": datetime.fromtimestamp(story["created_timestamp_ms"]).strftime(
                    "%m/%d/%Y"
                ),
            }

        else:
            return {}

    def get_comments_for_story(self, comment):
        if len(comment) > 0:
            author = self.find_record("users", {"uuid": comment["author_uuid"]})
            return {
                "author": f"{author['first_name']} {author['last_name']}",
                "date": datetime.fromtimestamp(
                    comment["created_timestamp_ms"]
                ).strftime("%m/%d/%Y %I:%M %p"),
                "content": comment["comment"],
                "comment_uuid": comment["uuid"],
                "author_uuid": author["uuid"],
            }
        else:
            return {}
