import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProductsOnDiscountQuery } from "../../product/hooks/useProductsOnDiscountQuery";
import { queryKeys } from "../../../config/query";
import { Item } from "../../product/schemas/itemSchema";
import * as Services from "../services/wishlistServices";

export const useWishlist = () => {
    const queryClient = useQueryClient();
    const { data: productOnDiscount, isLoading: onDiscountLoading } =
        useProductsOnDiscountQuery();

    const { data: wishlistItems, isLoading: wishlistItemLoading } = useQuery<
        Item[]
    >({
        queryKey: [queryKeys.WISHLIST],
        queryFn: () => Services.fetchWishlistProduct(),
    });

    const addToWishList = useMutation({
        mutationFn: Services.addToWishList,
        onMutate: async (itemId: number) => {
            await queryClient.cancelQueries({ queryKey: [queryKeys.WISHLIST] });
            const previousWishlist = queryClient.getQueryData<Item[]>([
                queryKeys.WISHLIST,
            ]);
            const product = queryClient.getQueryData<Item>([
                queryKeys.PRODUCT,
                { productId: itemId },
            ]) ?? {
                id: itemId,
                name: "Loading...",
                price: 0,
                image: "Loading...",
                discount: 0,
                category: "Loading...",
            };
            queryClient.setQueryData<Item[]>(
                [queryKeys.WISHLIST],
                (oldData) => {
                    return oldData
                        ? [...oldData, { ...product }]
                        : [{ ...product }];
                }
            );
            return { previousWishlist };
        },
        onError: (_err, _variable, context) => {
            queryClient.setQueryData(
                [queryKeys.WISHLIST],
                context?.previousWishlist
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.WISHLIST] });
        },
    }).mutateAsync;

    const removeFromWishlist = useMutation({
        mutationFn: Services.removeFromWishlist,
        onMutate: async (itemId: number) => {
            await queryClient.cancelQueries({ queryKey: [queryKeys.WISHLIST] });
            const previousWishlist = queryClient.getQueryData<Item[]>([
                queryKeys.WISHLIST,
            ]);
            queryClient.setQueryData<Item[]>(
                [queryKeys.WISHLIST],
                (oldData) => {
                    return oldData
                        ? oldData.filter((item) => item.id !== itemId)
                        : [];
                }
            );
            return { previousWishlist };
        },
        onError: (_err, _variable, context) => {
            queryClient.setQueryData(
                [queryKeys.WISHLIST],
                context?.previousWishlist
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.WISHLIST] });
        },
    }).mutateAsync;

    return {
        wishlistItems,
        productOnDiscount,
        isLoading: onDiscountLoading || wishlistItemLoading,
        addToWishList,
        removeFromWishlist,
    };
};
