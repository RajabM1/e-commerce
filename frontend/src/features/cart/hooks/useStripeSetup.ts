import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryKeys } from "../../../config/query";
import * as Services from "../services/stripeSetupServices";

export const useStripeSetup = (amount: number) => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [hasClientSecret, setHasClientSecret] = useState<boolean>(false);

    const amountInCents = amount * 100;

    const {
        data: stripeConfig,
        error: stripeConfigError,
        isSuccess: isStripeConfigSuccess,
    } = useQuery({
        queryKey: [queryKeys.STRIPE_CONFIG],
        queryFn: () => Services.fetchStripeConfig(),
    });

    useEffect(() => {
        if (
            isStripeConfigSuccess &&
            stripeConfig &&
            stripeConfig.publishableKey
        ) {
            setStripePromise(loadStripe(stripeConfig.publishableKey));
        }
    }, [isStripeConfigSuccess, stripeConfig]);

    if (stripeConfigError) {
        console.error(
            "Error fetching Stripe configuration:",
            stripeConfigError
        );
    }

    const { data: clientSecret, isSuccess: isClientSecretSuccess } = useQuery({
        queryKey: [queryKeys.PAYMENT_INTENT],
        queryFn: () => Services.fetchPaymentIntent(amountInCents),
        enabled: !hasClientSecret,
    });

    if (isClientSecretSuccess && !hasClientSecret) {
        setHasClientSecret(true);
    }

    return { stripePromise, clientSecret };
};
