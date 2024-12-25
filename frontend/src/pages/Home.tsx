import Root from "../components/market/layout/Root";
import Container from "@mui/material/Container";
import ProductList from "../components/market/product/ProductList";
import MultipleRowsSlider from "../components/market/slider/MultipleRowsSlider";
import ProductSlider from "../components/market/slider/ProductSlider";
import { useCategory } from "../features/categories/context";
import "../../styles/pages/Home.scss";
import { useProductsQuery } from "../features/product/hooks/useProductsQuery";
import { useProductsOnDiscountQuery } from "../features/product/hooks/useProductsOnDiscountQuery";

const Home = () => {
    const { data: products } = useProductsQuery();
    const { data: productsOnDiscount } = useProductsOnDiscountQuery();
    const { categories } = useCategory();

    return (
        <Root>
            <Container maxWidth="xl">
                <ProductSlider
                    label="Hot Deals"
                    bgcolor="#F5F5F5"
                    textColor="#d32f2f"
                    data={productsOnDiscount}
                />
            </Container>
            <MultipleRowsSlider data={categories} />
            <Container maxWidth="xl">
                <ProductList data={products} />
            </Container>
        </Root>
    );
};

export default Home;
