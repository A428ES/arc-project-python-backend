# from api.app import create_app

# run_app = create_app()
# run_app.run()

from db.mongo_schemas import MongoSchemas
from api.utility.form_validator import FormValidator

new_schema = MongoSchemas().new_comment()
test = {'comment':99}
current_user = {'uuid':"current_user"}
new_validation = FormValidator(current_user, test, new_schema)

print(new_validation.schema)