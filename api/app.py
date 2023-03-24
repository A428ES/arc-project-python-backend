from flask import Flask, blueprints

def create_app(config=None):
    app = Flask(__name__)

    from api.user.user import user_route

    app.register_blueprint(user_route)

    return app
