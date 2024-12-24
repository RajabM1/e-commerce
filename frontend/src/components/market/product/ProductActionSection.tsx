import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../features/cart/context";
import { paths } from "../../../config/paths";

const ProductActionSection = ({
    id,
    category,
}: {
    id: number;
    category: string;
}) => {
    const navigate = useNavigate();
    const { removeFromCart } = useShoppingCart();

    const handleSimilarItem = (category: string) => {
        navigate(paths.MARKET.BY_CATEGORY(category));
    };
    const handleWishList = (id: number) =>
        alert(`This feature does not available for item_id ${id}`);
    return (
        <Box>
            <IconButton
                aria-label="View"
                color="default"
                onClick={() => handleSimilarItem(category)}
                className="icon-button"
            >
                <SearchRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
                aria-label="Favorite"
                color="default"
                onClick={() => handleWishList(id ?? 0)}
            >
                <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton
                aria-label="Delete"
                color="default"
                onClick={() => removeFromCart(id ?? 0)}
            >
                <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default ProductActionSection;
