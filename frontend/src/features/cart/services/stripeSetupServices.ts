import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchStripeConfig = async () => {
    const response = await HttpService.getRequest(endpoints.STRIPE.CONFIG);
    return response.data;
};

export const fetchPaymentIntent = async (amountInCents: number) => {
    const response = await HttpService.postRequest(
        endpoints.STRIPE.CREATE_PAYMENT_INTENT,
        {
            amount: amountInCents,
            currency: "usd",
        }
    );
    return response.data.clientSecret;
};
