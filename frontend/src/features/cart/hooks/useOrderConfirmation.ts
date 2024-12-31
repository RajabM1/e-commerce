import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as Services from "../services/orderConfirmationServices";

export const useOrderConfirmation = (
    addressId: string,
    orderCode: string,
    selectedShippingMethodId: string
) => {
    const { data: addressData, isLoading: isAddressLoading } = useQuery({
        queryKey: [queryKeys.USER_ADDRESS, { addressId }],
        queryFn: () => Services.fetchAddressData(addressId),
    });

    const { data: orderData, isLoading: isOrderLoading } = useQuery({
        queryKey: [queryKeys.ORDER_INFORMATION, { orderCode }],
        queryFn: () => Services.fetchOrderData(orderCode),
    });

    const { data: shippingMethodsData, isLoading: isShippingMethodsLoading } =
        useQuery({
            queryKey: [
                queryKeys.SELECTED_SHIPPING_METHODS,
                { selectedShippingMethodId },
            ],
            queryFn: () =>
                Services.fetchShippingMethodsData(selectedShippingMethodId),
        });

    return {
        addressData,
        orderData,
        shippingMethodsData,
        isLoading:
            isAddressLoading || isOrderLoading || isShippingMethodsLoading,
    };
};
