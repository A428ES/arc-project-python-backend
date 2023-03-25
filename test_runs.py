from api.app import db
from api.utility.form_validator import FormValidator

test = {"comment": "This will start out as a test comment ... but will slowly attempt to turn >>, <<< >><<< into an XSS attack '''''''"}
current_user = {"uuid": "222f67f2-ca12-4702-adad-47959280756e"}
new_validation = FormValidator(current_user, test, db.new_comment()).validate_form()

print(new_validation)
