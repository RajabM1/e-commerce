import { PropsWithChildren, useMemo } from "react";
import ShoppingCartContext from "./ShoppingCartContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/context";
import { Item } from "../../product/schemas/itemSchema";
import * as Services from "./services";
import { queryKeys } from "../../../config/query";

const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const { currentUser } = useAuth();
    const queryClient = useQueryClient();

    const { data: cartItems } = useQuery<Item[]>({
        initialData: [],
        enabled: !!currentUser,
        queryKey: [queryKeys.CART_ITEMS],
        queryFn: () => Services.fetchCartItems(),
    });

    const cartQuantity = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + (item.quantity || 0),
            0
        );
    }, [cartItems]);

    const addToCartMutation = useMutation({
        mutationFn: Services.addToCart,
        onMutate: async (data) => {
            await queryClient.cancelQueries({
                queryKey: [queryKeys.CART_ITEMS],
            });

            const previousCart = queryClient.getQueryData<Item[]>([
                queryKeys.CART_ITEMS,
            ]);

            const product = queryClient.getQueryData<Item>([
                queryKeys.PRODUCT,
                { productId: data.itemId },
            ]) ?? {
                id: data.itemId,
                name: "Loading...",
                price: 0,
                image: "Loading...",
                discount: 0,
                category: "Loading...",
            };

            queryClient.setQueryData<Item[]>(
                [queryKeys.CART_ITEMS],
                (oldData) => {
                    const cartItem = oldData ?? [];
                    const existingItemIndex = cartItems.findIndex(
                        (item) => item.id === data.itemId
                    );

                    if (existingItemIndex > -1) {
                        const updatedCartItems = [...cartItems];
                        updatedCartItems[existingItemIndex] = {
                            ...updatedCartItems[existingItemIndex],
                            quantity:
                                (updatedCartItems[existingItemIndex]
                                    ?.quantity || 0) + data.quantity,
                        };
                        return [...updatedCartItems];
                    }
                    return [
                        ...cartItem,
                        { ...product, quantity: data.quantity },
                    ];
                }
            );
            return { previousCart };
        },
        onError: (_error, _data, context) => {
            queryClient.setQueryData(
                [queryKeys.CART_ITEMS],
                context?.previousCart
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.CART_ITEMS] });
        },
    });

    const updateCartItemMutation = useMutation({
        mutationFn: Services.updateCartItem,
        onSuccess: (_, { itemId, quantity }) => {
            queryClient.setQueryData<Item[]>(
                [queryKeys.CART_ITEMS],
                (oldData) =>
                    oldData?.map((item) =>
                        item.id === itemId ? { ...item, quantity } : item
                    )
            );
        },
    });

    const removeFromCartMutation = useMutation({
        mutationFn: Services.removeItemFromCart,
        onSuccess: (_, itemId) => {
            queryClient.setQueryData<Item[]>(
                [queryKeys.CART_ITEMS],
                (oldData) => oldData?.filter((item) => item.id !== itemId)
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
