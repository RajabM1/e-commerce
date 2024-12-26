import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import HttpService from "../../../service/HttpService";
import {
    StripeAddressElement,
    StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { ShippingMethodType } from "../../../types/shippingMethods";
import endpoints from "../../../config/api";
import { paths } from "../../../config/paths";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";

export const useCheckoutForm = (clientSecret: string, orderTotal: number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [selectedShippingMethod, setSelectedShippingMethod] =
        useState<ShippingMethodType | null>(null);
    const [isAddressComplete, setIsAddressComplete] = useState<boolean>(false);

    const saveAddressAndOrderMutation = useMutation({
        mutationFn: async (addressElement: StripeAddressElement) => {
            const addressData = await addressElement.getValue();
            const addressResponse = await HttpService.postRequest(
                endpoints.USER.ADDRESSES,
                addressData
            );
            const addressId = addressResponse.data.id;

            const orderResponse = await HttpService.postRequest(
                endpoints.ORDER.CREATE,
                {
                    addressId,
                    shippingMethodId: Number(selectedShippingMethod?.id),
                }
            );
            const trackingCode = orderResponse.data.tracking_code;
            await HttpService.deleteRequest(endpoints.SHIPPING_CART.DELETE);

            return {
                addressId,
                trackingCode,
            };
        },
    });

    const handlePaymentSubmitMutation = useMutation({
        mutationFn: async (event: React.FormEvent) => {
            event.preventDefault();
            if (!stripe || !elements) return;
            const response = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
                confirmParams: {
                    return_url: "http://localhost:5173/order/confirmation",
                },
            });
            return response;
        },
        onSuccess: async (data) => {
            if (data?.paymentIntent?.status === "succeeded") {
                const addressElement = elements?.getElement(AddressElement);
                if (addressElement) {
                    const { addressId, trackingCode } =
                        await saveAddressAndOrderMutation.mutateAsync(
                            addressElement
                        );
                    navigate(paths.ORDER.CONFIRMATION, {
                        state: {
                            addressId,
                            trackingCode,
                            selectedShippingMethodId:
                                selectedShippingMethod?.id,
                        },
                    });
                }
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.CART_ITEMS],
                });
            }
        },
        onError: () => {
            console.log("Payment submission error:");
        },
    });

    const handleShippingMethodSelectMutation = useMutation({
        mutationFn: async (method: ShippingMethodType) => {
            setSelectedShippingMethod(method);
            const stripeResponse = await stripe?.retrievePaymentIntent(
                clientSecret
            );
            const paymentIntentId = stripeResponse?.paymentIntent?.id;
            await HttpService.postRequest(
                endpoints.STRIPE.UPDATE_PAYMENT_INTENT,
                {
                    paymentIntentId: paymentIntentId,
                    amount: (orderTotal + method.cost) * 100,
                    currency: "usd",
                }
            );
        },
    });

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setIsAddressComplete(event.complete);
    };

    return {
        isLoading: handlePaymentSubmitMutation.status === "pending",
        handlePaymentSubmit: handlePaymentSubmitMutation.mutateAsync,
        handleShippingMethodSelect:
            handleShippingMethodSelectMutation.mutateAsync,
        handleAddressChange,
        selectedShippingMethod,
        isAddressComplete,
    };
};
