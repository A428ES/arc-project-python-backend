from flask import Flask, blueprints

def create_app(config=None):
    app = Flask(__name__)

    from api.user.user import user_route
    from api.admin.admin import admin_route
    from api.stories.stories import stories_route
    from api.comments.comments import comment_route

    app.register_blueprint(user_route)
    app.register_blueprint(admin_route)
    app.register_blueprint(stories_route)
    app.register_blueprint(comment_route)

    return app
