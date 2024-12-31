import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchAddressData = async (addressId: string) => {
    const response = await HttpService.getRequest(
        endpoints.USER.ADDRESSES_BY_ID(addressId)
    );
    return response.data;
};

export const fetchOrderData = async (orderCode: string) => {
    const response = await HttpService.getRequest(
        endpoints.ORDER.BY_TRACKING_CODE(orderCode)
    );
    return response.data;
};

export const fetchShippingMethodsData = async (
    selectedShippingMethodId: string
) => {
    const response = await HttpService.getRequest(
        endpoints.ORDER.SHIPPING_METHODS_BY_ID(selectedShippingMethodId)
    );
    return response.data;
};
