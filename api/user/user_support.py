class UserSupport:
    def __init__(working_user):
        self.db = db
        self.working_user = working_user

    def get_user_data():
        return {"results": {
            "email": current_user["email"],
            "firstname": current_user["first_name"],
            "lastname": current_user["last_name"],
            "created": current_user["created_timestamp_ms"],
            "uuid": current_user["uuid"],
            "story_count": len(db.find_record("stories", {"author_uuid":self.working_user['uuid']}, first=False)),
            "comment_count": len(db.find_record("comments", {"author_uuid":self.working_user['uuid']}, first=False))
        }}