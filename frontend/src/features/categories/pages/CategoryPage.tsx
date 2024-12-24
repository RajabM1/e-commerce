import Container from "@mui/material/Container";
import ProductList from "../../../components/market/product/ProductList";
import Root from "../../../components/market/layout/Root";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import Message from "../../../components/shared/feedback/Message";
import { useCategoryPage } from "../hooks/useCategoryPage";
import { useCategory } from "../context";
import "../styles/CategoryPage.scss";

const CategoryPage = () => {
    const { category } = useParams();
    const { categories } = useCategory();
    const { fetchCategoryItem } = useCategoryPage();
    const navigate = useNavigate();

    const isValidCategory = categories.some((cat) => cat.name === category);

    const {
        data: categoryItems,
        isLoading,
        error,
    } = useQuery({
        enabled: isValidCategory,
        queryKey: [queryKeys.CATEGORY_ITEMS, category],
        queryFn: () => fetchCategoryItem(category ?? "Other"),
    });

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
