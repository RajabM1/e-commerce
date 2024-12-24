import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../../../../styles/components/market/cart/OrderSummary.scss";
import PriceSection from "../../../components/market/product/PriceSection";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useOrderSummary } from "../hooks/useOrderSummary";
import { Item } from "../../product/schemas/itemSchema";

type OrderPreviewType = {
    orderItems: Item[];
    couponDiscount: number | null;
    shippingFees: number | null;
};

const OrderPreview = ({
    orderItems,
    couponDiscount,
    shippingFees,
}: OrderPreviewType) => {
    const orderSummary = useOrderSummary(
        orderItems,
        couponDiscount,
        shippingFees
    );
    return (
        <Box
            className="order-preview-section"
            sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
            {orderItems.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        mb: 2,
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Box
                            component="img"
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                mr: 2,
                            }}
                            src={item.image}
                            alt={item.name}
                        />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Quantity: {item.quantity}
                            </Typography>
                        </Box>
                    </Box>
                    <PriceSection price={item.price} discount={item.discount} />
                </Box>
            ))}

            <Divider />
            <Box mt={3} className="order-summary-container">
                <Box className="summary-item">
                    <Typography variant="body1" className="s-t-c">
                        Subtotal:
                    </Typography>
                    <Typography variant="body1" className="p-t-c">
                        {formatCurrency(orderSummary.subTotal)}
                    </Typography>
                </Box>
                <Box className="summary-item">
                    <Typography variant="body1" className="s-t-c">
                        Saved:
                    </Typography>
                    <Typography variant="body1" className="offer-t-c">
                        - {formatCurrency(orderSummary.saved)}
                    </Typography>
                </Box>
                {orderSummary.discount != null && (
                    <Box className="summary-item">
                        <Typography variant="body1" className="s-t-c">
                            Discount:
                        </Typography>
                        <Typography variant="body1" className="offer-t-c">
                            - {formatCurrency(orderSummary.discount)}
                        </Typography>
                    </Box>
                )}
                {orderSummary.shippingFees != null && (
                    <Box className="summary-item">
                        <Typography variant="body1" className="s-t-c">
                            Shipping Fees:
                        </Typography>
                        <Typography variant="body1" className="p-t-c">
                            {formatCurrency(orderSummary.shippingFees)}
                        </Typography>
                    </Box>
                )}
                <Divider className="divider" />
                <Box className="summary-item">
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1">
                        {formatCurrency(orderSummary.total)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderPreview;
