import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import {
    StripeAddressElement,
    StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { ShippingMethodType } from "../../../types/shippingMethods";
import { paths } from "../../../config/paths";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as Services from "../services/checkoutFormServices";

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
            const addressResponse = await Services.saveAddress(addressData);
            const addressId = addressResponse.id;

            const orderResponse = await Services.saveOrder(
                addressId,
                selectedShippingMethod?.id ?? ""
            );
            const trackingCode = orderResponse.tracking_code;

            return {
                addressId,
                trackingCode,
            };
        },
        onSuccess: () => Services.deleteShippingCart(),
    }).mutateAsync;

    const { mutateAsync: handlePaymentSubmit, status: paymentStatus } =
        useMutation({
            mutationFn: async (event: React.FormEvent) => {
                event.preventDefault();
                if (!stripe || !elements) return;
                const response = await stripe.confirmPayment({
                    elements,
                    redirect: "if_required",
                });
                return response;
            },
            onSuccess: async (data) => {
                if (data?.paymentIntent?.status === "succeeded") {
                    const addressElement = elements?.getElement(AddressElement);
                    if (addressElement) {
                        const { addressId, trackingCode } =
                            await saveAddressAndOrderMutation(addressElement);
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

    const handleShippingMethodSelect = useMutation({
        mutationFn: async (method: ShippingMethodType) => {
            setSelectedShippingMethod(method);
            const stripeResponse = await stripe?.retrievePaymentIntent(
                clientSecret
            );
            const paymentIntentId = stripeResponse?.paymentIntent?.id ?? "";
            const amount = orderTotal + method.cost;
            Services.updatePaymentIntent(paymentIntentId, amount);
        },
    }).mutateAsync;

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setIsAddressComplete(event.complete);
    };

    return {
        isLoading: paymentStatus === "pending",
        handlePaymentSubmit,
        handleShippingMethodSelect,
        handleAddressChange,
        selectedShippingMethod,
        isAddressComplete,
    };
};
