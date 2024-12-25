import Container from "@mui/material/Container";
import ProductList from "../../../components/market/product/ProductList";
import Root from "../../../components/market/layout/Root";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Message from "../../../components/shared/feedback/Message";
import { useCategoryProductsQuery } from "../hooks/useCategoryProductsQuery";
import "../styles/CategoryPage.scss";
import { useValidCategory } from "../hooks/useValidCategory";

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const isValidCategory = useValidCategory(category ?? "Other");

    const {
        data: categoryItems,
        isLoading,
        error,
    } = useCategoryProductsQuery(category, isValidCategory);

    if (!isValidCategory) {
        navigate(-1);
        return null;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            <Container maxWidth="xl">
                {error && <Message message={error.message} type={"error"} />}
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        {category ?? "Other"}
                    </Typography>
                </Box>
                <Container maxWidth="xl">
                    <ProductList data={categoryItems ?? []} />
                </Container>
            </Container>
        </Root>
    );
};

export default CategoryPage;
