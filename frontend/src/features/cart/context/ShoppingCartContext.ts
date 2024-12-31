import { createContext } from "react";
import { IShoppingCartContext } from "./types";

const ShoppingCartContext = createContext<IShoppingCartContext | undefined>(
    undefined
);

export default ShoppingCartContext;
