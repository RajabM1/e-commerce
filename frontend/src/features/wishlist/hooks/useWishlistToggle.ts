import { useWishlist } from "./useWishlist";

export const useWishlistToggle = (productId: number) => {
    const { addToWishList, removeFromWishlist, wishlistItems } = useWishlist();

    const isWishlist = wishlistItems?.some((item) => item.id === productId);
    const handleWishList = () => {
        if (isWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishList(productId);
        }
    };

    return { handleWishList, isWishlist };
};
