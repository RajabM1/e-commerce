import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import HttpService from "../../service/HttpService";
import { StripeAddressElement } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

export const useCheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const saveAddressAndOrder = async (
        addressElement: StripeAddressElement
    ) => {
        const addressData = await addressElement.getValue();

        const response = await HttpService.postRequest(
            "users/address",
            addressData
        );

        await HttpService.postRequest("order", {
            addressId: response.address.id,
        });
        await HttpService.deleteRequest("cart");
    };

    const handlePaymentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        try {
            const paymentResult = await stripe.confirmPayment({
                elements,
                redirect: "if_required", 
                confirmParams: {
                    return_url: "http://localhost:5173", 
                },
            });

            if (paymentResult.paymentIntent?.status === "succeeded") {
                const addressElement = elements.getElement(AddressElement);
                if (addressElement) {
                    await saveAddressAndOrder(addressElement);
                }
                navigate("/");
            }
        } catch (error: unknown) {
            console.log("Payment submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handlePaymentSubmit,
    };
};