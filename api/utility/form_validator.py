from config.config import Config
import re
import html


class FormValidator:
    def __init__(self, current_user, json_request, schema_object):
        self.json_req = json_request
        self.schema = schema_object
        self.json_req["author_uuid"] = current_user["uuid"]

        self.minimum_key_match()

    def field_validate_length(self, entry):
        if self.schema[entry]["length"] is None:
            return True

        if len(self.json_req[entry]) > self.schema[entry]["length"]:
            raise Exception(f"{entry} exceeds length")

    def field_validate_not_empty(self, entry):
        if self.json_req[entry] in ["", None, "None"]:
            raise Exception(f"{entry}  cannot be left empty")

    def field_validate_type(self, entry):
        try:
            if self.schema[entry]["type"] == "string":
                self.json_req[entry] = str(self.json_req[entry])
            elif self.schema[entry]["type"] == "int":
                self.json_req[entry] = int(self.json_req[entry])
        except Exception:
            raise Exception(f"{entry} Invalid type for field")

    def minimum_key_match(self):
        key_match = [key for key in self.schema.keys() if key in self.json_req.keys()]

        if len(key_match) != len(self.schema.keys()):
            raise Exception("The request object is missing required keys")

    def regex_validation(self, entry):
        if self.schema[entry]["regex"] == None:
            return True

        if (
            re.match(
                Config.regex_dict[self.schema[entry]["regex"]], self.json_req[entry]
            )
            is None
        ):
            raise Exception(f"{entry} Does not match required regex")

    def final_sanitiation(self, entry):
        if not isinstance(self.json_req[entry], str):
            return self.json_req[entry]

        return html.escape(
            "".join(
                [
                    char
                    for char in self.json_req[entry]
                    if char not in Config.remove_characters
                ]
            )
        )

    def validate_request_field(self, entry):
        self.field_validate_type(entry)

        if self.schema[entry]["type"] == "string":
            self.field_validate_length(entry)
            self.field_validate_not_empty(entry)
            self.regex_validation(entry)

        self.json_req[entry] = self.final_sanitiation(entry)

    def validate_form(self):
        for item in self.json_req.keys():
            self.validate_request_field(item)

        return self.json_req
