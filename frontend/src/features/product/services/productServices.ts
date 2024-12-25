import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchProducts = async () => {
    const response = await HttpService.getRequest(endpoints.PRODUCT.ALL);
    return response.data;
};

export const fetchProductsOnDiscount = async () => {
    const response = await HttpService.getRequest(
        endpoints.PRODUCT.ON_DISCOUNT
    );
    return response.data;
};

export const fetchProductById = async (id: number) => {
    const response = await HttpService.getRequest(endpoints.PRODUCT.BY_ID(id));
    return response.data;
};
