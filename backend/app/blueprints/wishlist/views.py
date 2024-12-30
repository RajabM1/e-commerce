from app.blueprints.wishlist import wishlist_bp
from app.blueprints.wishlist.schemas import WishlistItemSchema
from app.blueprints.wishlist import services
from app.blueprints.product.schemas import ItemSchema
from app.utils.auth_helpers import get_current_user
from flask import jsonify, request
from flask_jwt_extended import jwt_required


wishlist_item_schema = WishlistItemSchema()
items_schema = ItemSchema(many=True)


@wishlist_bp.route("", methods=["GET"])
@jwt_required()
def get_wishlist_items():
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    wishlist_items = services.list_wishlist_items(user.id)

    return (
        jsonify(
            {
                "message": "wishlist items retrieved successfully",
                "data": items_schema.dump(wishlist_items),
            }
        ),
        200,
    )


@wishlist_bp.route("/items", methods=["POST"])
@jwt_required()
def add_wishlist_item():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    wishlist_item = services.add_item_to_wishlist(user.id, json_data)
    if not wishlist_item:
        return jsonify({"message": "Item already in wishlist"}), 400

    return (
        jsonify(
            {
                "message": "Item added to wishlist successfully",
                "data": wishlist_item_schema.dump(wishlist_item),
            }
        ),
        201,
    )


@wishlist_bp.route("/items/<int:item_id>", methods=["DELETE"])
@jwt_required()
def delete_wishlist_item(item_id):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    item_to_delete = services.delete_item_from_wishlist(user.id, item_id)
    if not item_to_delete:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return jsonify({"message": "Item deleted successfully"}), 200
