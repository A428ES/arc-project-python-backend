from flask import Flask
from flask_login import LoginManager
from db.mongo_controller import MongoController
from config.config import Config

db = MongoController()
login_manager = LoginManager()


def create_app(config=None):
    app = Flask(__name__)
    login_manager.init_app(app)

    from api.user.user import user_route
    from api.admin.admin import admin_route
    from api.stories.stories import stories_route
    from api.comments.comments import comment_route

    app.register_blueprint(user_route)
    app.register_blueprint(admin_route)
    app.register_blueprint(stories_route)
    app.register_blueprint(comment_route)

    return app
