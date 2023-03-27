from flask import Flask
from db.mongo_controller import MongoController
from api.utility.user_login import User
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = MongoController()

def create_app(config=None):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '93j0fjef0dsfs'
    app.config["JWT_SECRET_KEY"] = "93j0fjef0dsfs-secret" 
    jwt = JWTManager(app)

    CORS(app)
   
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        print(jwt_data)
        return db.find_record("users", {'email':jwt_data['sub']}) 

    from api.user.user import user_route
    from api.admin.admin import admin_route
    from api.stories.stories import stories_route
    from api.comments.comments import comment_route

    app.register_blueprint(user_route)
    app.register_blueprint(admin_route)
    app.register_blueprint(stories_route)
    app.register_blueprint(comment_route)

    return app
