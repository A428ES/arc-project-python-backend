from flask import Blueprint

stories_route = Blueprint('stories', __name__)

@stories_route.route('/', methods=['GET'])
def main_page():
    return {'results':'all stories here'}