from app.blueprints.user import users_bp
from app.blueprints.auth import auth_bp
from app.blueprints.product import product_bp
from app.blueprints.category import category_bp
from app.blueprints.coupon import coupon_bp
from app.blueprints.cart import cart_bp
from app.blueprints.order import order_bp
from app.blueprints.stripe import stripe_bp
from app.blueprints.wishlist import wishlist_bp


def register_blueprints(app):
    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(coupon_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(stripe_bp)
    app.register_blueprint(wishlist_bp)
