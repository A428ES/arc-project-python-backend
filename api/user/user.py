from flask import Blueprint, request
from flask_jwt_extended import jwt_required, create_access_token
from api.utility.user_login import User
from api.app import db
from api.utility.form_validator import FormValidator

user_route = Blueprint("user", __name__)

@user_route.route("/user", methods=["GET"])
def main_user():
    return {"results": "main user"}

@user_route.route("/user/register", methods=['GET'])
def user_register():
    request_args = {"first_name": request.args.get("firstname"),
                    "last_name":request.args.get("lastname"), 
                    "email":request.args.get("email"),
                    "password":request.args.get("password")}
    
    new_validation = FormValidator(request_args, db.new_user_account()).validate_form()
    
    return db.insert_record("users", new_validation)

@user_route.route("/user/login", methods=['GET'])
def user_login_view():
    request_args = {"email":request.args.get("email"),
                    "password":request.args.get("password")}
    
    processed_request = FormValidator(request_args, db.new_login()).validate_form()
    locate_user = db.find_record('users', {'email':processed_request['email']})

    if locate_user != None:
        if processed_request['password'] == locate_user['password']:
            access_token = create_access_token(identity=locate_user['email'])

            return {'results':access_token}

    return {'results':'invalid login attempt'}

@user_route.route("/user/logout", methods=['GET'])
def user_logout():
    return {'results':'logged out'}

@user_route.route("/user/check_logged_in", methods=['GET'])
@jwt_required()
def check_logged_in():
    return {'results':'logged in'}