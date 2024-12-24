import { loadStripe, Stripe } from "@stripe/stripe-js";
import HttpService from "../../../service/HttpService";
import endpoints from "../../../config/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useStripeSetup = (amount: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const amountInCents = amount * 100;

    const {
        data: stripeConfig,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ["stripeConfig"],
        queryFn: async () => {
            const response = await HttpService.getRequest(
                endpoints.STRIPE.CONFIG
            );
            return response.data;
        },
    });

    useEffect(() => {
        if (isSuccess && stripeConfig) {
            setStripePromise(loadStripe(stripeConfig.publishableKey));
        }
    }, [isSuccess, stripeConfig]);

    if (error) {
        console.error("Error fetching Stripe configuration:", error);
    }

    const { data: clientSecret } = useQuery({
        queryKey: ["paymentIntent"],
        queryFn: async () => {
            const response = await HttpService.postRequest(
                endpoints.STRIPE.CREATE_PAYMENT_INTENT,
                {
                    amount: amountInCents,
                    currency: "usd",
                }
            );
            return response.data.clientSecret;
        },
    });

    return { stripePromise, clientSecret };
};
