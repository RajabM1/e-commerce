import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Star } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import PriceSection from "./PriceSection";
import { useShoppingCart } from "../../../features/cart/context";
import { paths } from "../../../config/paths";
import { Item } from "../../../features/product/schemas/itemSchema";

const ProductCard = ({ id, name, price, image, category, discount }: Item) => {
    const navigate = useNavigate();
    const onCardClick = () => navigate(paths.MARKET.BY_PRODUCT_ID(id ?? 1));
    const { addToCart } = useShoppingCart();
    return (
        <Grid>
            <Card className="product-card" onClick={onCardClick}>
                <Box className="card-media-box">
                    <CardMedia
                        component="img"
                        image={image}
                        alt={`${name} image`}
                        className="card-media"
                    />
                    <Box className="category-badge">
                        <Typography variant="body2">{category}</Typography>
                    </Box>
                </Box>
                <CardContent className="card-content">
                    <Typography variant="h1" className="card-title">
                        {name}
                    </Typography>
                    <Box className="card-rating">
                        <Box className="rating-section">
                            <Star
                                className="star-icon"
                                aria-label="Star rating"
                            />
                            <Typography
                                variant="body2"
                                className="rating-number"
                            >
                                {4.5}
                            </Typography>
                            <Typography variant="body2">
                                ({"1.2K"} Reviews)
                            </Typography>
                        </Box>
                        <PriceSection discount={discount} price={price} />
                    </Box>
                </CardContent>
                <CardActions className="card-actions">
                    <Button
                        variant="outlined"
                        onClick={(event) => {
                            event.stopPropagation();
                            addToCart({
                                itemId: id,
                                quantity: 1,
                                price,
                            });
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button variant="contained">See Preview</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;
