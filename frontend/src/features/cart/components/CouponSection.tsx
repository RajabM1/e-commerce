import { Button, Grid2, TextField } from "@mui/material";
import { useCoupon } from "../hooks/useCoupon";

interface Props {
    setDiscount: (discount: number) => void;
    setCouponCode: (code: string) => void;
    cartTotal: number;
}

const CouponSection = ({ setDiscount, setCouponCode, cartTotal }: Props) => {
    const {
        couponCode,
        isCouponApplied,
        isLoading,
        errorMessage,
        updateCouponCode,
        handleApplyCoupon,
    } = useCoupon(setDiscount, setCouponCode, cartTotal);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 9 }}>
                <TextField
                    type="text"
                    label="Coupon Code"
                    fullWidth
                    value={couponCode}
                    onChange={(e) => updateCouponCode(e.target.value)}
                    disabled={isCouponApplied || isLoading}
                    error={!!errorMessage}
                    helperText={errorMessage}
                />
            </Grid2>
            <Grid2 size={{ xs: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    fullWidth
                    sx={{ height: "100%", backgroundColor: "black" }}
                    aria-label="Apply Coupon"
                    disabled={isCouponApplied || isLoading}
                >
                    {isLoading
                        ? "Loading..."
                        : isCouponApplied
                        ? "Applied"
                        : "Apply"}
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default CouponSection;
