from flask import Blueprint, request
from flask_jwt_extended import jwt_required, create_access_token, current_user
from api.app import db
from api.utility.form_validator import FormValidator
from api.user.user_support import UserSupport
import bcrypt

user_route = Blueprint("user", __name__)


@user_route.errorhandler(Exception)
def handle_general_exception(e):
    return {"error": str(e)}, 400


@user_route.route("/user", methods=["GET"])
def main_user():
    return {"results": "main user"}


@user_route.route("/user/register", methods=["POST"])
def user_register():
    request_args = {
        "first_name": request.get_json()["firstname"],
        "last_name": request.get_json()["lastname"],
        "email": request.get_json()["email"],
        "password": request.get_json()["password"],
    }

    incoming = FormValidator(request_args, db.new_user_account()).validate_form()
    incoming["password"] = bcrypt.hashpw(incoming["password"].encode("utf-8"), bcrypt.gensalt())

    if db.insert_record("users", incoming) == None:
        raise Exception("An unknown error occured during registration")
    
    return {"results": "true"}

@user_route.route("/user/login", methods=["GET"])
def user_login_view():
    get_args = {
        "email": request.args.get("email"),
        "password": request.args.get("password"),
    }

    incoming = FormValidator(get_args, db.new_login()).validate_form()
    user = db.find_record("users", {"email": incoming["email"]})

    if user == None:
        raise Exception("Invalid user")
    

    if not bcrypt.checkpw(incoming["password"].encode("utf-8"), user["password"]):
        raise Exception("Invalid password")
    
    access_token = create_access_token(identity=user["email"])
    user_response = UserSupport(db, user).get_user_data()

    user_response['results'].update({'access':access_token})

    return user_response


@user_route.route("/user/changepw", methods=["POST"])
@jwt_required()
def change_password():
    incoming = request.get_json()
    user = db.find_record("users", {"email": current_user["email"]})

    if not bcrypt.checkpw(incoming["old_password"].encode("utf-8"), current_user["password"]):
        raise Exception("Old password incorrect")

    user["password"] = bcrypt.hashpw(incoming["new_password"].encode("utf-8"), bcrypt.gensalt())

    db.update_record("users", user)

    return {"results": "complete"}


@user_route.route("/user/logout", methods=["GET"])
def user_logout():
    return {"results": "logged out"}


@user_route.route("/user/check_logged_in", methods=["GET"])
@jwt_required()
def check_logged_in():
    return UserSupport(db, current_user).get_user_data()