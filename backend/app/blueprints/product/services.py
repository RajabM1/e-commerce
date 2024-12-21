from app.extensions import db
from app.blueprints.product.models import Item
from app.blueprints.product.schemas import ItemSchema


item_schema = ItemSchema()


def get_item(item_id):
    return Item.query.get(item_id)


def get_all_available_items():
    return Item.query.filter(Item.quantity > 0).all()


def create_new_item(json_data):
    new_item = item_schema.load(json_data)
    db.session.add(new_item)
    db.session.commit()
    return new_item


def delete_item(item):
    db.session.delete(item)
    db.session.commit()


def update_item(original_item, item_to_update):
    item_schema = ItemSchema(partial=True)
    updated_item = item_schema.load(item_to_update, instance=original_item)
    db.session.commit()
    return updated_item


def get_items_on_discount():
    return Item.query.filter(Item.discount > 0).all()
