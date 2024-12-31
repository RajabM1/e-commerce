import { createContext } from "react";
import { IWishlistContext } from "./types";

const WishlistContext = createContext<IWishlistContext | undefined>(undefined);

export default WishlistContext;
