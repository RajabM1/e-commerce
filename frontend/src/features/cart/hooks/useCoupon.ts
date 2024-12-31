import { useState } from "react";
import { useShoppingCart } from "../context";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "../../../types/apiError";

interface Props {
    couponCode: string;
    isCouponApplied: boolean;
    isLoading: boolean;
    errorMessage: string;
    updateCouponCode: (code: string) => void;
    handleApplyCoupon: () => Promise<void>;
}

export const useCoupon = (
    setDiscount: (discount: number) => void,
    setCouponCode: (code: string) => void,
    cartTotal: number
): Props => {
    const { handleCouponApply } = useShoppingCart();

    const [couponCode, updateCouponCode] = useState("");
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { mutateAsync: handleApplyCoupon, status: applyCouponStatus } =
        useMutation({
            mutationFn: async () => {
                if (!couponCode.trim()) {
                    throw new ApiError("Coupon code cannot be empty");
                }
                const response = await handleCouponApply({
                    couponCode: couponCode.trim().toUpperCase(),
                    cartTotal,
                });
                return response;
            },
            onSuccess: (data) => {
                setErrorMessage("");
                setDiscount(data.discountAmount);
                setCouponCode(couponCode.trim().toUpperCase());
                setIsCouponApplied(true);
            },
            onError: (error: ApiError) => {
                setErrorMessage(error.response.data.message);
            },
        });

    return {
        couponCode,
        isCouponApplied,
        isLoading: applyCouponStatus === "pending",
        errorMessage,
        updateCouponCode,
        handleApplyCoupon,
    };
};
