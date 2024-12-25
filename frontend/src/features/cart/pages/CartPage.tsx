import Root from "../../../components/market/layout/Root";
import OrderSummary from "../components/OrderSummary";
import CustomerTrustSection from "../components/CustomerTrustSection";
import ProductList from "../components/ProductList";
import { useTranslation } from "react-i18next";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import EmptyCart from "../components/EmptyCart";
import { useShoppingCart } from "../context";
import "../styles/CartPage.scss";
import { useProductsOnDiscountQuery } from "../../product/hooks/useProductsOnDiscountQuery";

const CartPage = () => {
    const { t } = useTranslation("cart-page");
    const { cartItems, cartQuantity } = useShoppingCart();
    const { data: ProductsOnDiscount } = useProductsOnDiscountQuery();

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
                    data={ProductsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default CartPage;
