import { Box, Button, Typography } from "@mui/material";
import { paths } from "../../../config/paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
    const { t } = useTranslation("wishlist-page");
    const navigate = useNavigate();

    return (
        <Box className="empty-wishlist-container">
            <Box
                className="empty-wishlist-image"
                component="img"
                src="https://ae01.alicdn.com/kf/Sc700e14fefac4cf8bb47ec2f9da0d6det/720x720.png"
                alt={"empty wishlist"}
            />
            <Typography variant="h5" className="s-t-c m-b-1">
                {t("empty-wishlist.title")}
            </Typography>
            <Typography className="empty-wishlist-text s-t-c">
                {t("empty-wishlist.subtitle")}
            </Typography>
            <Button
                className="empty-wishlist-button"
                variant="contained"
                onClick={() => navigate(paths.HOME)}
            >
                {t("empty-wishlist.button")}
            </Button>
        </Box>
    );
};

export default EmptyWishlist;
