class Config:
    test_config = None

    regex_dict = {
        "name": "[a-zA-Z]{2,}",
        "password": "[A-Za-z0-9@#$]{8,16}",
        "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b",
        "uuid": "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    }

    remove_characters = []
