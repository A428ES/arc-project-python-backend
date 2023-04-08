from flask import Blueprint, request
from flask_jwt_extended import jwt_required, current_user
from api.app import db
from api.utility.form_validator import FormValidator

stories_route = Blueprint("stories", __name__)


@stories_route.errorhandler(Exception)
def handle_general_exception(e):
    raise
    return {"error": str(e)}, 400


@stories_route.route("/", methods=["POST"])
def main_page():
    story_results = [
        db.get_story_for_frontend(story)
        for story in db.find_record("stories", {}, first=False)
    ]

    print("here")
    story_results = [story for story in story_results if len(story) > 0]

    if len(story_results) < 1:
        results = "No stories to show"
    print(f"printing story_results{story_results}")
    return {"results": story_results}


@stories_route.route("/stories/submit", methods=["POST"])
@jwt_required()
def submit_story():
    req = request.get_json()

    request_args = {
        "title": req["title"],
        "story": req["story"],
        "author_uuid": current_user["uuid"],
    }

    new_validation = FormValidator(request_args, db.new_story()).validate_form()

    find_insert = db.insert_record("stories", new_validation)

    if find_insert != None:
        return {"results": "true"}

    raise Exception("An unknown error occured during story submission")


@stories_route.route("/stories/mystories", methods=["POST"])
@jwt_required()
def my_stories():
    stories = db.find_record(
        "stories", {"author_uuid": current_user["uuid"]}, first=False
    )

    return {"results": [db.get_story_for_frontend(story) for story in stories]}
