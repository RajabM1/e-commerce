import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryKeys } from "../../../config/query";
import * as Services from "../services/stripeSetupServices";

export const useStripeSetup = (amount: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const amountInCents = amount * 100;

    const {
        data: stripeConfig,
        error,
        isSuccess,
    } = useQuery({
        queryKey: [queryKeys.STRIPE_CONFIG],
        queryFn: () => Services.fetchStripeConfig(),
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
        queryKey: [queryKeys.PAYMENT_INTENT],
        queryFn: () => Services.fetchPaymentIntent(amountInCents),
    });

    return { stripePromise, clientSecret };
};
