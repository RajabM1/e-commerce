import { Link, useNavigate, useParams } from "react-router-dom";
import ImageSection from "../../../features/product/components/ImageSection";
import Rating from "../../../features/product/components/Rating";
import { useProduct } from "../hooks/useProduct";
import QuantitySelector from "../../../components/market/product/QuantitySelector";
import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import { useTranslation } from "react-i18next";
import PriceSection from "../../../components/market/product/PriceSection";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";
import Root from "../../../pages/market/Root";
import "../styles/ProductPage.scss";
import HttpService from "../../../service/HttpService";
import endpoints from "../../../config/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";

const ProductPage = () => {
    const { t } = useTranslation("product-page");
    const { id } = useParams();
    const { addToCart } = useShoppingCart();
    const { itemsOnDiscount } = useProduct();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const fetchProductById = async (id: number) => {
        const response = await HttpService.getRequest(
            endpoints.PRODUCT.BY_ID(id)
        );
        setQuantity(1);
        return response.data;
    };
    const { data: formData, isLoading } = useQuery({
        queryKey: [queryKeys.PRODUCT, id],
        queryFn: () => fetchProductById(Number(id)),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        navigate(-1);
        return null;
    }

    return (
        <Root>
            <Container maxWidth="xl" className="product-container">
                <Box className="product-box">
                    <ImageSection
                        imageUrl={formData.image ?? ""}
                        name={formData.name}
                    />
                    <Box className="product-info">
                        <Typography className="product-name" variant="h5">
                            {formData.name}
                        </Typography>
                        <Box className="rate-price-section">
                            <PriceSection
                                discount={formData.discount}
                                price={formData.price}
                            />
                            <Rating rating={t("rating")} />
                        </Box>

                        <Typography variant="body1" className="description">
                            {formData.description}
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
                                    addToCart(
                                        formData.id ?? 0,
                                        quantity,
                                        formData.price
                                    );
                                    setQuantity(1);
                                }}
                            >
                                {t("add_to_cart")}
                            </Button>
                        </Box>

                        <Link className="wishlist-link" to={"#"}>
                            {t("add_to_wishlist")}
                        </Link>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl">
                <ProductSlider
                    label={t("sliderLabel")}
                    data={itemsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default ProductPage;
