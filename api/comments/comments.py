from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from api.utility.form_validator import FormValidator
from api.app import db

comment_route = Blueprint("comment", __name__)


@comment_route.errorhandler(Exception)
def handle_general_exception(e):
    raise
    return {"error": str(e)}, 400


@comment_route.route("/comments/count", methods=["GET"])
def get_comments_for_story():
    comments = db.find_record(
        "comments", {"story_uuid": request.args.get("id")}, first=False
    )

    if comments == None:
        return {"results": 0}

    return {"results": len(comments)}


@comment_route.route("/comments/display", methods=["GET"])
def diplay_comments_for_story():
    comments = db.find_record(
        "comments", {"story_uuid": request.args.get("id")}, first=False
    )
    print("get ready for it")
    print(comments)
    if comments == None:
        return {"results": {"No comments to display"}}

    return {"results": [db.get_comments_for_story(comment) for comment in comments]}


@comment_route.route("/comments/submit", methods=["POST"])
@jwt_required()
def add_comment():
    req = request.get_json()

    request_args = {
        "comment": req["comment"],
        "story_uuid": req["story"],
        "author_uuid": current_user["uuid"],
    }

    new_validation = FormValidator(request_args, db.new_comment()).validate_form()

    find_insert = db.insert_record("comments", new_validation)

    if find_insert != None:
        return {"results": "true"}

    raise Exception("An unknown error occured during story submission")
