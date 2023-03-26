from flask import Blueprint, request
from flask_login import login_user, login_required, logout_user
from api.utility.user_login import User
from api.app import db
from api.utility.form_validator import FormValidator

user_route = Blueprint("user", __name__)


@user_route.route("/user", methods=["GET"])
def main_user():
    return {"results": "main user"}

@user_route.route("/user/register", methods=['GET'])
def user_register():
    new_user = {"first_name": "Sergio",
                    "last_name":"Estrada", 
                    "email":"testtest@test.com",
                    "password":"testtesttest99@"}
    
    new_validation = FormValidator(new_user, db.new_user_account()).validate_form()
    
    return db.insert_record("users", new_validation)

@user_route.route("/user/login", methods=['GET'])
def user_login_view():
    user = request.args.get("user")
    password = request.args.get("pass")

    locate_user = db.find_record('users', {'email':user})

    if locate_user != None:
        if password == locate_user[0]['password']:
            login_user(User(locate_user[0]['email']))

            return {'results':'logged in'}

    return {'results':'invalid login attempt'}

@user_route.route("/user/logout", methods=['GET'])
@login_required
def user_logout():
    logout_user()
    return {'results':'logged out'}

@user_route.route("/user/check_logged_in", methods=['GET'])
@login_required
def check_logged_in():
    return {'results':'logged in'}