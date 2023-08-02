from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, current_user
from api.utility.user_login import User
from api.app import db
from api.utility.form_validator import FormValidator
import bcrypt
from datetime import datetime
from api.user.user_support import UserSupport

user_route = Blueprint("user", __name__)


@user_route.errorhandler(Exception)
def handle_general_exception(e):
    return {"error": str(e)}, 400


@user_route.route("/user", methods=["GET"])
def main_user():
    return {"results": "main user"}


@user_route.route("/user/register", methods=["POST"])
def user_register():
    req = request.get_json()

    request_args = {
        "first_name": req["firstname"],
        "last_name": req["lastname"],
        "email": req["email"],
        "password": req["password"],
    }

    new_validation = FormValidator(request_args, db.new_user_account()).validate_form()
    new_validation["password"] = bcrypt.hashpw(
        new_validation["password"].encode("utf-8"), bcrypt.gensalt()
    )

    find_insert = db.insert_record("users", new_validation)

    if find_insert != None:
        return {"results": "true"}

    raise Exception("An unknown error occured during registration")


@user_route.route("/user/login", methods=["GET"])
def user_login_view():
    request_args = {
        "email": request.args.get("email"),
        "password": request.args.get("password"),
    }

    processed_request = FormValidator(request_args, db.new_login()).validate_form()

    locate_user = db.find_record("users", {"email": processed_request["email"]})

    if locate_user != None:
        if bcrypt.checkpw(
            processed_request["password"].encode("utf-8"), locate_user["password"]
        ):
            access_token = create_access_token(identity=locate_user["email"])

            user_response = UserSupport(db, locate_user).get_user_data()
            user_response['results'].update({'access':access_token})

            return user_response

    raise Exception("invalid login attempt")


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