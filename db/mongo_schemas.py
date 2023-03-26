class MongoSchemas:
    def schema_builder(self, value=None, val_type="string", length=36, regex=None):
        return {"value": value, "type": val_type, "length": length, "regex": regex}

    def new_user_account(self):
        return {
            "first_name": self.schema_builder(regex="name"),
            "last_name": self.schema_builder(regex="name"),
            "email": self.schema_builder(length=30, regex="email"),
            "password": self.schema_builder(length=16, regex="password"),
        }

    def new_comment(self):
        return {
            "comment": self.schema_builder(length=500),
            "author_uuid": self.schema_builder(regex="uuid"),
        }

    def new_story(self):
        return {
            "title": self.schema_builder(length=30),
            "story": self.schema_builder(length=None),
            "author_uuid": self.schema_builder(regex="uuid"),
        }
    
    def new_login(self):
        return {
            "email": self.schema_builder(length=30, regex="email"),
            "password": self.schema_builder(length=16, regex="password")
        }

