class FormValidator:
    def __init__(self, current_user, json_request, schema_object):
        self.json_req = json_request
        self.schema = schema_object
        self.user = current_user
        self.json_req["author_uuid"] = current_user["uuid"]

        self.minimum_key_match()
        self.validate_form()

    def field_validate_length(self, entry):
        if (
            self.schema[entry]["length"] is None
            or self.schema[entry]["type"] != "string"
        ):
            return True

        if len(self.json_req[entry]) > self.schema[entry]["length"]:
            raise Exception("Entry exceeds length")

    def field_validate_not_empty(self, entry):
        if self.json_req[entry] in ["", None, "None"]:
            raise Exception("This field cannot be left empty")

    def field_validate_type(self, entry):
        try:
            if self.schema[entry]["type"] == "string":
                self.json_req[entry] = str(self.json_req[entry])
            elif self.schema[entry]["type"] == "int":
                self.json_req[entry] = int(self.json_req[entry])
        except Exception:
            raise Exception("Invalid type for field")

    def minimum_key_match(self):
        key_match = [key for key in self.schema.keys() if key in self.json_req.keys()]

        if len(key_match) != len(self.schema.keys()):
            raise Exception("The request object is missing required keys")

    def regex_validation(self):
        pass

    def validate_request_field(self, entry):
        self.field_validate_type(entry)
        self.field_validate_length(entry)
        self.field_validate_not_empty(entry)

        self.schema[entry]["value"] = self.json_req[entry]

    def validate_form(self):
        for item in self.json_req.keys():
            self.validate_request_field(item)

        return self.schema
