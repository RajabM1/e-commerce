from app.extensions import ma
from app.blueprints.wishlist.models import Wishlist, WishlistItem
from marshmallow import fields, ValidationError, validates


class WishlistSchema(ma.SQLAlchemyAutoSchema):
    user_id = fields.Int(required=True, data_key="userId")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("user_id")
    def validate_user_id(self, user_id):
        if Wishlist.query.filter(Wishlist.user_id == user_id).first():
            raise ValidationError("Id already exist")

    class Meta:
        model = Wishlist
        load_instance = True


class WishlistItemSchema(ma.SQLAlchemyAutoSchema):
    wishlist_id = fields.Int(required=True, data_key="wishlistId")
    item_id = fields.Int(required=True, data_key="itemId")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = WishlistItem
        load_instance = True
