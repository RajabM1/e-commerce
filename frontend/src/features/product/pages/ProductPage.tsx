import { useNavigate, useParams } from "react-router-dom";
import ImageSection from "../../../features/product/components/ImageSection";
import Rating from "../../../features/product/components/Rating";
import QuantitySelector from "../../../components/market/product/QuantitySelector";
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import { useTranslation } from "react-i18next";
import PriceSection from "../../../components/market/product/PriceSection";
import { useShoppingCart } from "../../cart/context";
import Root from "../../../components/market/layout/Root";
import "../styles/ProductPage.scss";
import { useProductsOnDiscountQuery } from "../hooks/useProductsOnDiscountQuery";
import { useProductByIdQuery } from "../hooks/useProductByIdQuery";
import { useWishlistToggle } from "../../wishlist/hooks/useWishlistToggle";

const ProductPage = () => {
    const { t } = useTranslation("product-page");
    const { id } = useParams();

    const { data: productsOnDiscount, isLoading: isProductsOnDiscountLoading } =
        useProductsOnDiscountQuery();
    const { data: product, isLoading: isProductLoading } = useProductByIdQuery(
        Number(id)
    );
    const { handleWishList, isWishlist } = useWishlistToggle(Number(id));

    const { addToCart } = useShoppingCart();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setQuantity(1);
    }, [id]);

    if (isProductsOnDiscountLoading || isProductLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        navigate(-1);
        return null;
    }

    return (
        <Root>
            <Container maxWidth="xl" className="product-container">
                <Box className="product-box">
                    <ImageSection
                        imageUrl={product.image ?? ""}
                        name={product.name}
                    />
                    <Box className="product-info">
                        <Typography className="product-name" variant="h5">
                            {product.name}
                        </Typography>
                        <Box className="rate-price-section">
                            <PriceSection
                                discount={product.discount}
                                price={product.price}
                            />
                            <Rating rating={t("rating")} />
                        </Box>

                        <Typography variant="body1" className="description">
                            {product.description}
                        </Typography>

                        <Box className="quantity-cart-section">
                            <QuantitySelector
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                            <Button
                                className="add-to-cart"
                                variant="contained"
                                onClick={() => {
                                    addToCart({
                                        itemId: product.id ?? 0,
                                        quantity,
                                        price: product.price,
                                    });
                                    setQuantity(1);
                                }}
                            >
                                {t("add_to_cart")}
                            </Button>
                        </Box>

                        <Button
                            className="wishlist-link"
                            onClick={handleWishList}
                        >
                            {isWishlist
                                ? t("remove_from_wishlist")
                                : t("add_to_wishlist")}
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl">
                <ProductSlider
                    label={t("sliderLabel")}
                    data={productsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default ProductPage;
