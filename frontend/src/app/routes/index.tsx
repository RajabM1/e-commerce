import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "../../features/auth/context";
import { ShoppingCartProvider } from "../../features/cart/context";
import { CategoryProvider } from "../../features/categories/context";

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <CategoryProvider>
                <ShoppingCartProvider>
                    <RouterProvider router={router} />
                </ShoppingCartProvider>
            </CategoryProvider>
        </AuthProvider>
    );
};
