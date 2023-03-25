class Config:
    test_config = None
    
    regex_dict = {
        'name':"^[a-z]*$",
        'email': r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b",
        'password:':'[A-Za-z0-9@#$]{16}',
        'uuid':'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
    }

    remove_characters = ['>', '<', '"', "'", ':', ';', '*']