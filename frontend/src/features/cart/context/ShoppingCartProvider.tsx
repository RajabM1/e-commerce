import { PropsWithChildren } from "react";
import ShoppingCartContext from "./ShoppingCartContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/context";
import { Item } from "../../product/schemas/itemSchema";
import * as Services from "./services";
const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const { currentUser } = useAuth();
    const queryClient = useQueryClient();

    const { data: cartItems } = useQuery<Item[]>({
        initialData: [],
        enabled: !!currentUser,
        queryKey: ["CartItems"],
        queryFn: () => Services.fetchCartItems(),
    });

    const calculateCartQuantity = () => {
        return cartItems?.reduce(
            (total, item) => total + (item.quantity || 0),
            0
        );
    };

    const cartQuantity = calculateCartQuantity();
    const addToCartMutation = useMutation({
        mutationFn: Services.addToCart,
        onSuccess: (data) => {
            queryClient.setQueryData<Item[]>(["CartItems"], (oldData) => [
                ...(oldData ?? []),
                data,
            ]);
        },
    });

    const updateCartItemMutation = useMutation({
        mutationFn: Services.updateCartItem,
        onSuccess: (_, { itemId, quantity }) => {
            queryClient.setQueryData<Item[]>(["CartItems"], (oldData) =>
                oldData?.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                )
            );
        },
    });

    const removeFromCartMutation = useMutation({
        mutationFn: Services.removeItemFromCart,
        onSuccess: (_, itemId) => {
            queryClient.setQueryData<Item[]>(["CartItems"], (oldData) =>
                oldData?.filter((item) => item.id !== itemId)
            );
        },
    });

    const handleCouponApplyMutation = useMutation({
        mutationFn: Services.handleCouponApply,
    });

    const valueToReturn = {
        cartQuantity,
        cartItems,
        addToCart: addToCartMutation.mutateAsync,
        removeFromCart: removeFromCartMutation.mutateAsync,
        updateCartItemQuantity: updateCartItemMutation.mutateAsync,
        handleCouponApply: handleCouponApplyMutation.mutateAsync,
    };

    return (
        <ShoppingCartContext.Provider value={valueToReturn}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
