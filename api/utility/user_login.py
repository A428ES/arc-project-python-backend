from flask_login import UserMixin
from db.mongo_controller import MongoController

class User(UserMixin, MongoController):
    def __init__(self):
        pass

    def find(self, user_id):
        self.db = MongoController()

        user = self.db.find_record("users", {'email':user_id})

        if user == None:
            return None

        self.id = user['email']
        self.password = user['password']

        return self