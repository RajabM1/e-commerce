import { Box, Container, Grid2, Typography } from "@mui/material";
import Root from "../../../components/market/layout/Root";
import ProductList from "../../cart/components/ProductList";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import { useTranslation } from "react-i18next";
import EmptyWishlist from "../components/EmptyWishlist";
import "../styles/WishlistPage.scss";
import { useWishlist } from "../context";
import { useProductsOnDiscountQuery } from "../../product/hooks/useProductsOnDiscountQuery";

const WishlistPage = () => {
    const { t } = useTranslation("wishlist-page");
    const { isLoading: wishlistProducts, wishlistItems } = useWishlist();
    const { data: productsOnDiscount, isLoading: productsOnDiscountLoading } =
        useProductsOnDiscountQuery();

    if (productsOnDiscountLoading || wishlistProducts) {
        return <div>Loading ...</div>;
    }
    return (
        <Root>
            <Container maxWidth="lg" className="wishlist-page">
                <Box className="header-box">
                    <Typography
                        variant="h4"
                        component="h1"
                        className="cart-title"
                    >
                        {t("title")}
                    </Typography>
                </Box>
                {wishlistItems?.length ? (
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <ProductList
                            data={wishlistItems}
                            isWishlistPage={true}
                        />
                    </Grid2>
                ) : (
                    <EmptyWishlist />
                )}
                <ProductSlider
                    label={t("sliderLabel")}
                    data={productsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default WishlistPage;
