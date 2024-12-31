import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchWishlistProduct = async () => {
    const response = await HttpService.getRequest(endpoints.WISHLIST.GET);
    return response.data;
};

export const addToWishList = async (itemId: number) => {
    await HttpService.postRequest(endpoints.WISHLIST.POST, { itemId });
};

export const removeFromWishlist = async (itemId: number) => {
    await HttpService.deleteRequest(endpoints.WISHLIST.DELETE(itemId));
};
