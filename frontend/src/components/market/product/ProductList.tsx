import Grid from "@mui/material/Grid2";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import SearchAppBar from "../../shared/search/SearchBar";
import { Item } from "../../../features/product/schemas/itemSchema";

const ProductList = ({ data }: { data: Item[] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <Box className="product-list-container">
            <Box className="header">
                <Typography variant="h3" component="h1" className="title">
                    Give All You Need
                </Typography>
                <SearchAppBar setSearchQuery={setSearchQuery} />
            </Box>
            <Grid size={{ xs: 12, md: 9 }}>
                <Grid container spacing={3}>
                    {paginatedData?.map((item) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                            <ProductCard
                                id={item.id ?? 0}
                                name={item.name}
                                price={item.price}
                                image={item.image ?? ""}
                                category={item.category}
                                discount={item.discount}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="pagination-container"
                    shape="rounded"
                />
            </Grid>
        </Box>
    );
};

export default ProductList;
