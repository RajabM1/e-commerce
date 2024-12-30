from app.extensions import db
from app.blueprints.wishlist.models import Wishlist, WishlistItem
from app.blueprints.wishlist.schemas import WishlistItemSchema


wishlist_item_schema = WishlistItemSchema()


def get_user_wishlist(user_id):
    wishlist = Wishlist.query.filter_by(user_id=user_id).first()
    return wishlist if wishlist else None


def get_user_wishlist_item(item_id, wishlist_id):
    wishlist_item = WishlistItem.query.filter_by(
        item_id=item_id, wishlist_id=wishlist_id
    ).first()
    return wishlist_item if wishlist_item else None


def add_item_to_wishlist(user_id, json_data):
    user_wishlist = get_user_wishlist(user_id)

    if not user_wishlist:
        user_wishlist = Wishlist(user_id=user_id)
        db.session.add(user_wishlist)
        db.session.flush()

    json_data["wishlistId"] = user_wishlist.id

    wishlist_item = get_user_wishlist_item(json_data["itemId"], json_data["wishlistId"])

    if wishlist_item:
        return

    wishlist_item = wishlist_item_schema.load(json_data)
    db.session.add(wishlist_item)
    db.session.commit()
    return wishlist_item


def delete_item_from_wishlist(user_id, item_id):
    user_wishlist = get_user_wishlist(user_id)
    if not user_wishlist:
        return None

    item_to_delete = get_user_wishlist_item(item_id, user_wishlist.id)
    if not item_to_delete:
        return None

    db.session.delete(item_to_delete)
    db.session.commit()
    return True


def list_wishlist_items(user_id):
    user_wishlist = get_user_wishlist(user_id)
    if not user_wishlist:
        return []

    items = user_wishlist.wishlist_items

    wishlist_items_data = [
        {
            "id": item.item.id,
            "name": item.item.name,
            "price": item.item.price,
            "description": item.item.description,
            "image": item.item.image,
            "discount": item.item.discount,
            "category_id": item.item.category_id,
        }
        for item in items
    ]
    return wishlist_items_data
