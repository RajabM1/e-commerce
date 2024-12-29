import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
    IShippingMethods,
    ShippingMethodType,
} from "../../../types/shippingMethods";
import "../../../../styles/components/market/cart/ShippingMethods.scss";
import endpoints from "../../../config/api";
import { useQuery } from "@tanstack/react-query";
import HttpService from "../../../service/HttpService";
import { queryKeys } from "../../../config/query";

const ShippingMethods = ({
    selectedMethod,
    onSelectMethod,
}: IShippingMethods) => {
    const { data: shippingMethods, isLoading } = useQuery<ShippingMethodType[]>(
        {
            queryKey: [queryKeys.SHIPPING_METHODS],
            queryFn: async () => {
                const response = await HttpService.getRequest(
                    endpoints.ORDER.SHIPPING_METHODS
                );
                return response.data;
            },
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box className="shipping-methods-container">
            <Typography variant="h6" className="header">
                Shipping Methods
            </Typography>
            <Box className="methods">
                {shippingMethods?.map((method) => (
                    <Box
                        key={method.id}
                        onClick={() => onSelectMethod(method)}
                        className={`method ${
                            selectedMethod === method.id ? "selected" : ""
                        }`}
                    >
                        <Typography variant="body1" className="name">
                            {method.name}
                        </Typography>
                        <Typography variant="body2">{method.label}</Typography>
                        <Typography variant="body2">
                            {formatCurrency(method.cost)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ShippingMethods;
