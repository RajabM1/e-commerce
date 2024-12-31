import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import { Item } from "../../product/schemas/itemSchema";
import * as Services from "./services";
import { PropsWithChildren } from "react";
import WishlistContext from "./WishlistContext";
import { useAuth } from "../../auth/context";

const WishlistProvider = ({ children }: PropsWithChildren) => {
    const { currentUser } = useAuth();
    const queryClient = useQueryClient();

    const { data: wishlistItems, isLoading: wishlistItemLoading } = useQuery<
        Item[]
    >({
        queryKey: [queryKeys.WISHLIST],
        queryFn: () => Services.fetchWishlistProduct(),
        enabled: !!currentUser,
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

    const valueToReturn = {
        wishlistItems,
        isLoading: wishlistItemLoading,
        addToWishList,
        removeFromWishlist,
    };

    return (
        <WishlistContext.Provider value={valueToReturn}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
