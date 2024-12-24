import Container from "@mui/material/Container";
import Root from "../../../components/market/layout/Root";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckoutForm from "../components/CheckoutForm";
import OrderPreview from "../components/OrderPreview";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeSetup } from "../hooks/useStripeSetup";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../context";
import { useState } from "react";

const CheckoutPage = () => {
    const location = useLocation();
    const { orderTotal, couponDiscount } = location.state || {};
    const { cartItems } = useShoppingCart();

    const { stripePromise, clientSecret } = useStripeSetup(orderTotal);

    const [shippingFees, setShippingFees] = useState<number | null>(null);
    return (
        <Root>
            <Container maxWidth="xl" className="cart-page">
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        CheckOut
                    </Typography>
                </Box>
                <Grid2 container spacing={2} p={2}>
                    <Grid2 size={{ xs: 12, md: 7 }} className="product-list">
                        {clientSecret && stripePromise && (
                            <Elements
                                stripe={stripePromise}
                                options={{ clientSecret }}
                            >
                                <CheckoutForm
                                    clientSecret={clientSecret}
                                    setShippingFees={setShippingFees}
                                    orderTotal={orderTotal}
                                />
                            </Elements>
                        )}
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 5 }}
                        sx={{ position: "relative" }}
                    >
                        <Box sx={{ position: "sticky", top: 80 }}>
                            <OrderPreview
                                orderItems={cartItems}
                                couponDiscount={couponDiscount}
                                shippingFees={shippingFees}
                            />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default CheckoutPage;
