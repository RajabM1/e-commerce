import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../features/cart/context";
import { paths } from "../../../config/paths";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Tooltip } from "@mui/material";
import { useWishlistToggle } from "../../../features/wishlist/hooks/useWishlistToggle";

const ProductActionSection = ({
    id,
    category,
    price,
    isWishlistPage,
}: {
    id: number;
    category: string;
    price: number;
    isWishlistPage?: boolean;
}) => {
    const navigate = useNavigate();
    const { removeFromCart, addToCart } = useShoppingCart();
    const { handleWishList, isWishlist } = useWishlistToggle(id);

    const handleSimilarItem = () => {
        navigate(paths.MARKET.BY_CATEGORY(category));
    };

    return (
        <Box>
            <Tooltip title="Similar item">
                <IconButton
                    aria-label="View"
                    color="default"
                    onClick={handleSimilarItem}
                    className="icon-button"
                >
                    <SearchRoundedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                <IconButton
                    aria-label="Favorite"
                    color="default"
                    onClick={handleWishList}
                >
                    {isWishlist ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </Tooltip>
            {!isWishlistPage ? (
                <Tooltip title="Remove from cart">
                    <IconButton
                        aria-label="Delete"
                        color="default"
                        onClick={() => removeFromCart(id ?? 0)}
                    >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add to cart">
                    <IconButton
                        aria-label="Delete"
                        color="default"
                        onClick={() =>
                            addToCart({
                                itemId: id ?? 0,
                                quantity: 1,
                                price: price,
                            })
                        }
                    >
                        <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default ProductActionSection;
