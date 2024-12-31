import { useContext } from "react";
import WishlistContext from "./WishlistContext";

const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (context === undefined) {
        throw new Error(
            "useWishlist must be used inside of a WishlistProvider"
        );
    }

    return context;
};

export default useWishlist;
