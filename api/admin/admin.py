from flask import Blueprint

admin_route = Blueprint("admin", __name__)


@admin_route.route("/admin", methods=["GET"])
def admin_panel():
    return {"results": "admin panel"}
