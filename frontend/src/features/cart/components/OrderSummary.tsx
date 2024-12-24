import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CouponSection from "./CouponSection";
import { useState } from "react";
import DiscountIcon from "@mui/icons-material/Discount";
import { useOrderSummary } from "../hooks/useOrderSummary";
import { paths } from "../../../config/paths";
import { useShoppingCart } from "../context";

const OrderSummary = () => {
    const { t } = useTranslation("order-summary");
    const { cartItems, cartQuantity } = useShoppingCart();
    const navigate = useNavigate();

    const [discount, setDiscount] = useState<number | null>(null);
    const [couponCode, setCouponCode] = useState<string | null>(null);

    const cartSummary = useOrderSummary(cartItems, discount, null);

    const handleCheckout = () => {
        navigate(paths.CART.CHECKOUT, {
            state: {
                orderTotal: cartSummary.total,
                couponDiscount: discount,
            },
        });
    };

    return (
        <Box className="order-summary-container">
            <Typography variant="h6" component="h1" className="summary-title">
                {t("title")}
            </Typography>
            <CouponSection
                setDiscount={setDiscount}
                setCouponCode={setCouponCode}
                cartTotal={cartSummary.total}
            />
            <Box className="summary-item">
                <Typography variant="body1" className="s-t-c">
                    {t("details.subtotal")}
                </Typography>
                <Typography variant="body1" className="p-t-c">
                    {formatCurrency(cartSummary.subTotal)}
                </Typography>
            </Box>
            <Box className="summary-item">
                <Typography variant="body1" className="s-t-c">
                    {t("details.saved")}
                </Typography>
                <Typography variant="body1" className="offer-t-c">
                    - {formatCurrency(cartSummary.saved)}
                </Typography>
            </Box>
            {discount && (
                <>
                    <Box className="summary-item">
                        <Typography variant="body1" className="s-t-c">
                            Coupon:
                        </Typography>
                    </Box>
                    <Box className="summary-item">
                        <Box sx={{ display: "flex" }}>
                            <DiscountIcon fontSize="small" />
                            <Typography>{couponCode}</Typography>
                        </Box>
                        <Typography variant="body1" className="offer-t-c">
                            - {formatCurrency(cartSummary.discount || 0)}
                        </Typography>
                    </Box>
                </>
            )}
            <Divider className="divider" />
            <Box className="summary-item">
                <Typography variant="subtitle1">{t("total")}</Typography>
                <Typography variant="subtitle1">
                    {formatCurrency(cartSummary.total)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                className="checkout-button"
                onClick={handleCheckout}
            >
                {t("button.checkout")} ({cartQuantity})
            </Button>
        </Box>
    );
};

export default OrderSummary;
