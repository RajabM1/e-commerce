from app.extensions import db
from sqlalchemy import func


class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer(), db.ForeignKey("user.id"), nullable=False, unique=True
    )
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    wishlist_items = db.relationship(
        "WishlistItem", backref="wishlist", lazy=True, cascade="all, delete-orphan"
    )


class WishlistItem(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    wishlist_id = db.Column(db.Integer(), db.ForeignKey("wishlist.id"), nullable=False)
    item_id = db.Column(db.Integer(), db.ForeignKey("item.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    item = db.relationship("Item", backref="wishlist_items", lazy=True)
