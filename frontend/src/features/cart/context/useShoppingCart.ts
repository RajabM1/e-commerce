import { useContext } from "react";
import ShoppingCartContext from "./ShoppingCartContext";

const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);

    if (context === undefined) {
        throw new Error(
            "useShoppingCart must be used inside of a ShoppingCartProvider"
        );
    }

    return context;
};

export default useShoppingCart;
