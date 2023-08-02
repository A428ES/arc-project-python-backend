class UserSupport:
    def __init__(self, db, working_user):
        self.db = db
        self.working_user = working_user

    def get_user_data(self):
        return {"results": {
            "email": self.working_user["email"],
            "firstname": self.working_user["first_name"],
            "lastname": self.working_user["last_name"],
            "created": self.working_user["created_timestamp_ms"],
            "uuid": self.working_user["uuid"],
            "story_count": len(self.db.find_record("stories", {"author_uuid":self.working_user['uuid']}, first=False)),
            "comment_count": len(self.db.find_record("comments", {"author_uuid":self.working_user['uuid']}, first=False))
        }}