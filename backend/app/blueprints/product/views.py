from app.decorators import admin_required
from app.blueprints.product import product_bp
from app.blueprints.product.schemas import ItemSchema
from app.blueprints.product import services as product_services
from app.blueprints.category import services as category_services
from flask import jsonify, request
from flask_jwt_extended import jwt_required


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)


@product_bp.route("", methods=["GET"])
@jwt_required()
def list_all_available_items():
    items = product_services.get_all_available_items()
    return (
        jsonify(
            {
                "message": "Items retrieved successfully",
                "data": items_schema.dump(items),
            }
        ),
        200,
    )


@product_bp.route("/<int:item_id>", methods=["GET"])
@jwt_required()
def get_item_by_id(item_id):
    item = product_services.get_item(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    return (
        jsonify(
            {"message": "Item retrieved successfully", "data": item_schema.dump(item)}
        ),
        200,
    )


@product_bp.route("/on-discount", methods=["GET"])
@jwt_required()
def get_items_on_discount():
    items = product_services.get_items_on_discount()

    return (
        jsonify(
            {
                "message": "Item On discount retrieved successfully",
                "data": items_schema.dump(items),
            }
        ),
        200,
    )


@product_bp.route("", methods=["POST"])
@admin_required()
def create_item():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_item = product_services.create_new_item(json_data)
    return (
        jsonify(
            {"message": "Item created successfully", "data": item_schema.dump(new_item)}
        ),
        201,
    )


@product_bp.route("/<int:item_id>", methods=["DELETE"])
@admin_required()
def delete_item(item_id):
    item = product_services.get_item(item_id)
    if not item:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    product_services.delete_item(item)
    return jsonify({"message": "Item deleted successfully"}), 200


@product_bp.route("/<int:item_id>", methods=["PATCH"])
@admin_required()
def update_item(item_id):
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    item = product_services.get_item(item_id)
    if not item:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    updated_item = product_services.update_item(item, json_data)

    return (
        jsonify(
            {
                "message": "Item Updated successfully",
                "data": item_schema.dump(updated_item),
            }
        ),
        200,
    )


@product_bp.route("/<string:category>", methods=["GET"])
@jwt_required()
def get_items_by_category(category):
    category_items = category_services.get_items_by_category_name(category)
    return (
        jsonify(
            {
                "message": "Items retrieved successfully from the category",
                "data": items_schema.dump(category_items),
            }
        ),
        200,
    )
