class MongoSchemas:
    def schema_builder(self, value=None, val_type="string", length=20, regex="standard"):
        return {
            'value': value,
            'type': val_type,
            'length': length,
            'regex': None
        }
    
    def new_user_account(self, first_name, last_name, email, password):
        return {
            'first_name': self.schema_builder(first_name),
            'last_name': self.schema_builder(last_name),
            'email': self.schema_builder(email, length=30, regex="email"),
            'password': self.schema_builder(password, lenght=16, regex="password"),
        }

    def new_comment(self):
        return {
            'comment': self.schema_builder(length=500, val_type="int"),
            'author_uuid': self.schema_builder(regex="uuid"),
        }

    def new_story(self, title, story, author_uuid):
        return {
            'title': self.schema_builder(title, length=30),
            'story': self.schema_builder(story, length=None),
            'author_uuid': self.schema_builder(author_uuid, regex="uuid"),
        }
