import QuantitySelector from "../product/QuantitySelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductActionSection from "./ProductActionSection";
import PriceSection from "../product/PriceSection";
import { useCategory } from "../../../features/categories/context";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";
import { paths } from "../../../config/paths";
import { Item } from "../../../features/product/schemas/itemSchema";

const ProductList = ({ data }: { data: Item[] }) => {
    const navigate = useNavigate();
    const { categories } = useCategory();
    const { updateCartItemQuantity } = useShoppingCart();

    const [, setItemQuantities] = useState(
        data.reduce(
            (acc, item) => ({ ...acc, [Number(item.id)]: item.quantity || 1 }),
            {}
        )
    );
    const setQuantity = (id: number, quantity: number) => {
        setItemQuantities((prev) => ({ ...prev, [id]: quantity }));
        updateCartItemQuantity(id, quantity);
    };

    const getCategoryById = (id: number) =>
        categories.find((category) => category.id === id);
    const handleNavigate = (id: number) =>
        navigate(paths.MARKET.BY_PRODUCT_ID(id));

    return (
        <Box className="product-list">
            {data.map((row) => (
                <Box key={row.id} className="product-item">
                    <Box
                        className="product-item-image"
                        component="img"
                        src={row.image ?? ""}
                        alt={row.name}
                        onClick={() => handleNavigate(row.id ?? 0)}
                    />

                    <Box className="product-item-details">
                        <Typography
                            className="product-name"
                            variant="h6"
                            onClick={() => handleNavigate(row.id ?? 0)}
                        >
                            {row.name}
                        </Typography>
                        <Typography variant="body2" className="s-t-c">
                            {getCategoryById(Number(row.category))?.name ??
                                "Other"}
                        </Typography>
                        <PriceSection
                            discount={row.discount}
                            price={row.price}
                        />
                    </Box>

                    <Box className="product-item-actions">
                        <QuantitySelector
                            quantity={row.quantity ?? 1}
                            setQuantity={(quantity: number) =>
                                setQuantity(row.id ?? 1, quantity)
                            }
                        />
                        <ProductActionSection
                            id={row.id ?? 0}
                            category={
                                getCategoryById(Number(row.category))?.name ??
                                "Other"
                            }
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ProductList;
