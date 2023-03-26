from flask_login import UserMixin
from db.mongo_controller import MongoController

class User(UserMixin, MongoController):
    def __init__(self, user_id):
        self.find(user_id)

    def find(self, user_id):
        self.db = MongoController()

        user = self.db.find_record("users", {'email':user_id})[0]

        self.id = user['email']
        self.password = user['password']