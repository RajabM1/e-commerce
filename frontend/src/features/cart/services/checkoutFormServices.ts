import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const updatePaymentIntent = async (
    paymentIntentId: string,
    amount: number
) => {
    await HttpService.postRequest(endpoints.STRIPE.UPDATE_PAYMENT_INTENT, {
        paymentIntentId: paymentIntentId,
        amount: amount * 100,
        currency: "usd",
    });
};

export const saveAddress = async (
    addressData: Pick<
        StripeAddressElementChangeEvent,
        "complete" | "isNewAddress" | "value"
    >
) => {
    const response = await HttpService.postRequest(
        endpoints.USER.ADDRESSES,
        addressData
    );
    return response.data;
};

export const saveOrder = async (
    addressId: number,
    selectedShippingMethodId: string
) => {
    const response = await HttpService.postRequest(endpoints.ORDER.CREATE, {
        addressId,
        shippingMethodId: Number(selectedShippingMethodId),
    });
    return response.data;
};

export const deleteShippingCart = async () => {
    await HttpService.deleteRequest(endpoints.SHIPPING_CART.DELETE);
};
