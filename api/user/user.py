from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, current_user
from api.utility.user_login import User
from api.app import db
from api.utility.form_validator import FormValidator

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

    print(locate_user)
    if locate_user != None:
        if processed_request["password"] == locate_user["password"]:
            access_token = create_access_token(identity=locate_user["email"])

            return {
                "results": {"access": access_token, "user_data": locate_user["email"]}
            }

    raise Exception("invalid login attempt")


@user_route.route("/user/logout", methods=["GET"])
def user_logout():
    return {"results": "logged out"}


@user_route.route("/user/check_logged_in", methods=["GET"])
@jwt_required()
def check_logged_in():
    return {
        "results": {
            "email": current_user["email"],
            "firstname": current_user["first_name"],
            "lastname": current_user["last_name"],
            "created": current_user["created_timestamp_ms"],
            "uuid": current_user["uuid"],
        }
    }
