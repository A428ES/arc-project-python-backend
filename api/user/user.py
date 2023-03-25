from flask import Blueprint

user_route = Blueprint("user", __name__)


@user_route.route("/user", methods=["GET"])
def main_user():
    return {"results": "main user"}
