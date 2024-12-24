import { useQuery } from "@tanstack/react-query";
import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const useOrderConfirmation = (
    addressId: string,
    orderCode: string,
    selectedShippingMethodId: string
) => {
    const {
        data: addressData,
        isLoading: isAddressLoading,
        error: addressError,
    } = useQuery({
        queryKey: ["shippingMethods"],
        queryFn: async () => {
            const response = await HttpService.getRequest(
                endpoints.USER.ADDRESSES_BY_ID(addressId)
            );
            return response.data;
        },
    });

    const {
        data: orderData,
        isLoading: isOrderLoading,
        error: orderError,
    } = useQuery({
        queryKey: ["orderInformation"],
        queryFn: async () => {
            const response = await HttpService.getRequest(
                endpoints.ORDER.BY_TRACKING_CODE(orderCode)
            );
            return response.data;
        },
    });

    const {
        data: shippingMethodsData,
        isLoading: isShippingMethodsLoading,
        error: shippingMethodsError,
    } = useQuery({
        queryKey: ["SelectedShippingMethods"],
        queryFn: async () => {
            const response = await HttpService.getRequest(
                endpoints.ORDER.SHIPPING_METHODS_BY_ID(selectedShippingMethodId)
            );
            return response.data;
        },
    });

    const isLoading =
        isAddressLoading || isOrderLoading || isShippingMethodsLoading;

    if (addressError) {
        console.error("Error fetching address data:", addressError);
    }
    if (orderError) {
        console.error("Error fetching order data:", orderError);
    }
    if (shippingMethodsError) {
        console.error("Error fetching shipping methods:", shippingMethodsError);
    }

    return { addressData, orderData, shippingMethodsData, isLoading };
};
