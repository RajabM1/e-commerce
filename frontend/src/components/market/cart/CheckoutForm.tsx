import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElementOptions } from "@stripe/stripe-js";
import Button from "@mui/material/Button";
import { useCheckoutForm } from "../../../hooks/cart/useCheckoutForm";

const CheckoutForm = () => {
    const { isLoading, handlePaymentSubmit } = useCheckoutForm();

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
        <form onSubmit={handlePaymentSubmit}>
            <AddressElement options={addressOptions} />

            <PaymentElement options={{ layout: "accordion" }} />
            <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Place Order"}
            </Button>
        </form>
    );
};

export default CheckoutForm;
