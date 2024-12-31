import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "../../features/auth/context";
import { ShoppingCartProvider } from "../../features/cart/context";
import { CategoryProvider } from "../../features/categories/context";
import { WishlistProvider } from "../../features/wishlist/context";

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <CategoryProvider>
                <ShoppingCartProvider>
                    <WishlistProvider>
                        <RouterProvider router={router} />
                    </WishlistProvider>
                </ShoppingCartProvider>
            </CategoryProvider>
        </AuthProvider>
    );
};
