from app.blueprints.cart import cart_bp
from app.blueprints.cart.schemas import CartItemSchema
from app.blueprints.cart import services
from app.blueprints.product.schemas import ItemSchema
from app.utils.auth_helpers import get_current_user
from flask import jsonify, request
from flask_jwt_extended import jwt_required


cart_item_schema = CartItemSchema()
items_schema = ItemSchema(many=True)


@cart_bp.route("", methods=["GET"])
@jwt_required()
def get_cart_items():
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart = services.get_user_cart(user.id)
    if not cart:
        return jsonify({"message": "Cart items retrieved successfully", "data": []}), 200

    cart_items = cart.cart_items

    cart_items_data = [
        {
            "id": cart_item.item.id,
            "name": cart_item.item.name,
            "price": cart_item.item.price,
            "quantity": cart_item.quantity,
            "description": cart_item.item.description,
            "image": cart_item.item.image,
            "discount": cart_item.item.discount,
            "category_id": cart_item.item.category_id,
        }
        for cart_item in cart_items
    ]
    return (
        jsonify(
            {
                "message": "Cart items retrieved successfully",
                "data": items_schema.dump(cart_items_data),
            }
        ),
        200,
    )


@cart_bp.route("", methods=["DELETE"])
@jwt_required()
def delete_cart():
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    success = services.delete_user_cart(user.id)
    if not success:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return jsonify({"message": "Cart deleted successfully"}), 200


@cart_bp.route("/items", methods=["POST"])
@jwt_required()
def add_cart_item():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart_item = services.add_item_to_cart(user.id, json_data)
    return (
        jsonify(
            {
                "message": "Item added to cart successfully",
                "data": cart_item_schema.dump(cart_item),
            }
        ),
        201,
    )


@cart_bp.route("/items", methods=["PATCH"])
@jwt_required()
def update_item_quantity():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart_item = services.update_item_quantity_in_cart(user.id, json_data)
    if not cart_item:
        return jsonify({"message": "Something went wrong, Please try again"}), 404

    return (
        jsonify(
            {
                "message": "Item quantity updated successfully",
                "data": cart_item_schema.dump(cart_item),
            }
        ),
        201,
    )


@cart_bp.route("/items/<int:item_id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(item_id):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    success = services.delete_item_from_cart(user.id, item_id)
    if not success:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return jsonify({"message": "Item deleted successfully"}), 200
