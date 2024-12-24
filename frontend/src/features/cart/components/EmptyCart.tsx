import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";

const EmptyCart = () => {
    const { t } = useTranslation("cart-page");
    const navigate = useNavigate();

    return (
        <Box className="empty-cart-container">
            <Box
                className="empty-cart-image"
                component="img"
                src="https://ae-pic-a1.aliexpress-media.com/kf/Sa15be314eadd4a9bb186ab4a0cb971b5D/360x360.png_.webp"
                alt={"empty cart"}
            />
            <Typography variant="h5" className="s-t-c m-b-1">
                {t("empty-cart.title")}
            </Typography>
            <Typography className="empty-cart-text s-t-c">
                {t("empty-cart.subtitle")}
            </Typography>
            <Button
                className="empty-cart-button"
                variant="contained"
                onClick={() => navigate(paths.HOME)}
            >
                {t("empty-cart.button")}
            </Button>
        </Box>
    );
};

export default EmptyCart;
