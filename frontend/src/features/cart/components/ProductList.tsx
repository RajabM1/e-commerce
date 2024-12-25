import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useShoppingCart } from "../../../features/cart/context";
import { paths } from "../../../config/paths";
import { Item } from "../../../features/product/schemas/itemSchema";
import PriceSection from "../../../components/market/product/PriceSection";
import QuantitySelector from "../../../components/market/product/QuantitySelector";
import ProductActionSection from "../../../components/market/product/ProductActionSection";
import { useCategoryById } from "../../categories/hooks/useCategoryById";

const ProductList = ({ data }: { data: Item[] }) => {
    const navigate = useNavigate();
    const { updateCartItemQuantity } = useShoppingCart();

    const [, setItemQuantities] = useState(
        data.reduce(
            (acc, item) => ({ ...acc, [Number(item.id)]: item.quantity || 1 }),
            {}
        )
    );
    const setQuantity = (id: number, quantity: number) => {
        setItemQuantities((prev) => ({ ...prev, [id]: quantity }));
        updateCartItemQuantity({ itemId: id, quantity });
    };

    const getCategoryById = useCategoryById;

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
