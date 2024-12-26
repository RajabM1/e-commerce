import { UseMutateFunction } from "@tanstack/react-query";
import { Item } from "../../product/schemas/itemSchema";

export interface IShoppingCartContext {
    cartQuantity: number;
    cartItems: Item[];
    addToCart: UseMutateFunction<
        void,
        Error,
        {
            itemId: number;
            quantity: number;
            price: number;
        },
        unknown
    >;
    removeFromCart: UseMutateFunction<unknown, unknown, number, unknown>;
    updateCartItemQuantity: UseMutateFunction<
        unknown,
        unknown,
        { itemId: number; quantity: number },
        unknown
    >;
    handleCouponApply: UseMutateFunction<
        number,
        unknown,
        { couponCode: string; cartTotal: number },
        unknown
    >;
}
