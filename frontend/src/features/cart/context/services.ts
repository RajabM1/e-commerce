import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchCartItems = async () => {
    const response = await HttpService.getRequest(endpoints.SHIPPING_CART.GET);
    return response.data;
};

export const addToCart = async ({
    itemId,
    quantity,
    price,
    event,
}: {
    itemId: number;
    quantity: number;
    price: number;
    event?: React.MouseEvent<HTMLButtonElement>;
}) => {
    event?.stopPropagation();
    await HttpService.postRequest(endpoints.SHIPPING_CART.CART_ITEMS, {
        itemId,
        quantity,
        price,
    });
    const itemResponse = await HttpService.getRequest(
        endpoints.PRODUCT.BY_ID(itemId)
    );
    return { ...itemResponse.data, quantity };
};

export const updateCartItem = async ({
    itemId,
    quantity,
}: {
    itemId: number;
    quantity: number;
}) => {
    await HttpService.patchRequest(endpoints.SHIPPING_CART.CART_ITEMS, {
        itemId,
        quantity,
    });
};

export const removeItemFromCart = async (itemId: number) => {
    await HttpService.deleteRequest(
        endpoints.SHIPPING_CART.DELETE_CART_ITEMS_BY_ID(itemId)
    );
};

export const handleCouponApply = async ({
    couponCode,
    cartTotal,
}: {
    couponCode: string;
    cartTotal: number;
}) => {
    const response = await HttpService.postRequest(endpoints.COUPONS.APPLY, {
        couponCode,
        cartTotal,
    });
    return response.data?.discountAmount || 0;
};

export const fetchItemById = async (id: number) => {
    const response = await HttpService.getRequest(endpoints.PRODUCT.BY_ID(id));
    return response.data;
};
