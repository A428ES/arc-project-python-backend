from flask import Flask
from flask_login import LoginManager
from db.mongo_controller import MongoController
from api.utility.user_login import User
from flask_cors import CORS

db = MongoController()
login_manager = LoginManager()


def create_app(config=None):
    app = Flask(__name__)
    login_manager.init_app(app)
    app.config['SECRET_KEY'] = '93j0fjef0dsfs'

    CORS(app)

    @login_manager.user_loader 
    def load_user(user_id):
        return User().find(user_id)


    from api.user.user import user_route
    from api.admin.admin import admin_route
    from api.stories.stories import stories_route
    from api.comments.comments import comment_route

    app.register_blueprint(user_route)
    app.register_blueprint(admin_route)
    app.register_blueprint(stories_route)
    app.register_blueprint(comment_route)

    return app
