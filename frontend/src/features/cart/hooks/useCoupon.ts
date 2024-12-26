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

    const handleApplyCouponMutation = useMutation({
        mutationFn: async () => {
            if (!couponCode.trim()) return;
            const response = await handleCouponApply({
                couponCode: couponCode.trim().toUpperCase(),
                cartTotal,
            });
            return response;
        },
        onSuccess: (data) => {
            setErrorMessage("");
            setDiscount(data);
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
        isLoading: handleApplyCouponMutation.status === "pending",
        errorMessage,
        updateCouponCode,
        handleApplyCoupon: handleApplyCouponMutation.mutateAsync,
    };
};
