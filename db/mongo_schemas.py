class MongoSchemas:
    def new_user_account(first_name, last_name, email, password):
        return {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password
        }

    def new_comment(comment, author_uuid):
        return {
            'comment': comment,
            'author_uuid': author_uuid,
        }

    def new_story(title, story, author_uuid):
        return {
            'title': title,
            'story': story,
            'author_uuid': author_uuid,
        }
