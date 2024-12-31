import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Grid2,
} from "@mui/material";
import Root from "../../../components/market/layout/Root";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import HomeIcon from "@mui/icons-material/Home";
import OrderPreview from "../components/OrderPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderConfirmation } from "../hooks/useOrderConfirmation";
import "../../../../styles/components/market/cart/OrderConfirmation.scss";
import { paths } from "../../../config/paths";

const OrderConfirmationPage = () => {
    const location = useLocation();
    const { addressId, trackingCode, selectedShippingMethodId } =
        location.state || {};
    const navigate = useNavigate();

    const { isLoading, addressData, orderData, shippingMethodsData } =
        useOrderConfirmation(addressId, trackingCode, selectedShippingMethodId);
    
    const orderCode = trackingCode;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(orderCode);
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Root>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        backgroundColor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        mb: 4,
                    }}
                >
                    <CheckCircleIcon
                        sx={{
                            fontSize: 80,
                            color: "success.main",
                            mb: 2,
                        }}
                    />
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight="bold"
                        mb={2}
                    >
                        Thank you for your order!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={3}>
                        The order confirmation email with details of your order
                        and a link to track its progress has been sent to your
                        email address.
                    </Typography>

                    <TextField
                        disabled
                        value={`ORDER CODE: ${orderCode}`}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="copy to clipboard"
                                        onClick={handleCopyToClipboard}
                                        edge="end"
                                    >
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "primary.main",
                            },
                        }}
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "background.default",
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartCheckoutIcon />}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                        }}
                        onClick={() => {
                            navigate(paths.HOME);
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>

                <Grid2
                    container
                    spacing={4}
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 3,
                        mb: 4,
                    }}
                >
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                mb: 2,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <HomeIcon color="primary" />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Shipping Address
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {addressData?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {addressData?.line1}
                                    {addressData?.line2 &&
                                        `, ${addressData?.line2}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {`${addressData?.city}, ${addressData?.state}, ${addressData?.postalCode}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {addressData?.country}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {addressData?.phone}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                mb: 2,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <LocalShippingIcon color="primary" />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Shipping Method
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {shippingMethodsData?.name} (
                                    {shippingMethodsData?.label})
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <PaymentIcon color="primary" />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Payment Method
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Visa ending in **** 1234
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <OrderPreview
                            orderItems={orderData}
                            couponDiscount={null}
                            shippingFees={shippingMethodsData.cost}
                        />
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default OrderConfirmationPage;
