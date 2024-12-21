import Root from "../Root";
import OrderSummary from "../../../components/market/cart/OrderSummary";
import CustomerTrustSection from "../../../components/market/cart/CustomerTrustSection";
import ProductList from "../../../components/market/cart/ProductList";
import { useProduct } from "../../../features/product/hooks/useProduct";
import { useTranslation } from "react-i18next";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import EmptyCart from "../../../components/market/cart/EmptyCart";
import "../../../../styles/pages/market/cart/CartPage.scss";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";

const CartPage = () => {
    const { t } = useTranslation("cart-page");
    const { cartItems, cartQuantity } = useShoppingCart();
    const { itemsOnDiscount } = useProduct();
    return (
        <Root>
            <Container maxWidth="xl" className="cart-page">
                {cartQuantity ? (
                    <>
                        <Box className="header-box">
                            <Typography
                                variant="h4"
                                component="h1"
                                className="cart-title"
                            >
                                {t("title")} ({cartQuantity})
                            </Typography>
                        </Box>
                        <Grid2 container spacing={2} p={2}>
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <ProductList data={cartItems} />
                            </Grid2>

                            <Grid2
                                className="side-root"
                                size={{ xs: 12, md: 4 }}
                            >
                                <Box className="side-section">
                                    <OrderSummary />
                                    <CustomerTrustSection />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </>
                ) : (
                    <EmptyCart />
                )}
                <ProductSlider
                    label={t("sliderLabel")}
                    data={itemsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default CartPage;
