from flask import Blueprint
from app.config import Config

wishlist_bp = Blueprint("wishlist", __name__, url_prefix=f"{Config.PREFIX}/wishlist")

from app.blueprints.wishlist import views
