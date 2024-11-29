from flask import Blueprint
from app.config import Config

stripe_bp = Blueprint("stripe", __name__, url_prefix=f"{Config.PREFIX}")

from app.blueprints.stripe import views
