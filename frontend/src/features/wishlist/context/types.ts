import { UseMutateFunction } from "@tanstack/react-query";
import { Item } from "../../product/schemas/itemSchema";

export interface IWishlistContext {
    isLoading: boolean;
    wishlistItems: Item[] | undefined;
    addToWishList: UseMutateFunction<
        void,
        Error,
        number,
        { previousWishlist: Item[] | undefined }
    >;
    removeFromWishlist: UseMutateFunction<
        void,
        Error,
        number,
        { previousWishlist: Item[] | undefined }
    >;
}
