import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";

const CustomerTrustSection = () => {
    const { t } = useTranslation("customer-trust-section");
    return (
        <Box className="customer-trust-section">
            <Box className="trust-item">
                <LocalShippingIcon className="icon" />
                <Typography variant="body1" className="title">
                    {t("fast_delivery")}
                </Typography>
            </Box>
            <Typography variant="body2" className="s-t-c">
                {t("refund_policy")}
            </Typography>

            <Box className="trust-item">
                <VerifiedUserIcon className="icon" />
                <Typography variant="body1" className="title">
                    {t("security_privacy")}
                </Typography>
            </Box>
            <Typography variant="body2" className="s-t-c">
                {t("safe_payments")}
            </Typography>

            <Box className="trust-item">
                <PaymentIcon className="icon" />
                <Typography variant="body1" className="title">
                    {t("safe_payment")}
                </Typography>
            </Box>
            <Box className="payment-options">
                <Box
                    component="img"
                    src="https://www.svgrepo.com/show/333620/visa.svg"
                    alt="Visa"
                    className="payment-logo"
                />
                <Box
                    component="img"
                    src="https://www.svgrepo.com/show/508701/mastercard-full.svg"
                    alt="Mastercard"
                    className="payment-logo"
                />
                <Box
                    component="img"
                    src="https://www.svgrepo.com/show/508402/apple-pay.svg"
                    alt="Apple Pay"
                    className="payment-logo"
                />
                <Box
                    component="img"
                    src="https://www.svgrepo.com/show/508404/amazon-pay.svg"
                    alt="Amazon Pay"
                    className="payment-logo"
                />
                <Box
                    component="img"
                    src="https://www.svgrepo.com/show/508716/paypal.svg"
                    alt="PayPal"
                    className="payment-logo"
                />
            </Box>
            <Typography variant="body2" className="s-t-c">
                {t("trusted_partners")}
            </Typography>
        </Box>
    );
};

export default CustomerTrustSection;
