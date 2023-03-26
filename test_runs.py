from api.app import db
from api.utility.form_validator import FormValidator

test = {
    "comment": "This will start out as a test comment ... but will slowly attempt to turn >>, <<< >><<< into an XSS attack '''''''"
}
new_user = {"first_name": "Sergio",
                "last_name":"Estrada", 
                "email":"test@test.com",
                "password":"testtest99@"}
new_validation = FormValidator(new_user, db.new_user_account()).validate_form()

print(new_validation)
