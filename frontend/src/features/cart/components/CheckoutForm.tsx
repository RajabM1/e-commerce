import { Box, Button } from "@mui/material";
import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElementOptions } from "@stripe/stripe-js";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import ShippingMethods from "./ShippingMethods";
import { useEffect } from "react";

interface Props {
    clientSecret: string;
    setShippingFees: React.Dispatch<React.SetStateAction<number | null>>;
    orderTotal: number;
}
const CheckoutForm = ({ clientSecret, setShippingFees, orderTotal }: Props) => {
    const {
        isLoading,
        handlePaymentSubmit,
        isAddressComplete,
        handleAddressChange,
        selectedShippingMethod,
        handleShippingMethodSelect,
    } = useCheckoutForm(clientSecret, orderTotal);

    useEffect(() => {
        setShippingFees(selectedShippingMethod?.cost ?? null);
    }, [selectedShippingMethod?.cost, setShippingFees]);

    const addressOptions: StripeAddressElementOptions = {
        mode: "shipping",
        fields: {
            phone: "always",
        },
        validation: {
            phone: {
                required: "always",
            },
        },
        autocomplete: {
            mode: "automatic",
        },
        contacts: [],
    };

    return (
        <Box component="form" onSubmit={(event) => handlePaymentSubmit(event)}>
            <AddressElement
                options={addressOptions}
                onChange={handleAddressChange}
            />
            {isAddressComplete && (
                <ShippingMethods
                    selectedMethod={selectedShippingMethod?.id || null}
                    onSelectMethod={handleShippingMethodSelect}
                />
            )}

            <PaymentElement options={{ layout: "accordion" }} />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{
                    backgroundColor: isLoading ? "gray" : "black",
                    color: "white",
                    mt: 1,
                    py: 1.5,
                }}
            >
                {isLoading ? "Processing..." : "Place Order"}
            </Button>
        </Box>
    );
};

export default CheckoutForm;
