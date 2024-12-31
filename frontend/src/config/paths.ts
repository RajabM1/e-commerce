export const paths = {
    HOME: "/",
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        FORGET_PASSWORD: "/auth/forget-password",
        RESET_PASSWORD: "/auth/reset-password/:token",
    },
    CART: {
        SHIPPING_CART: "/cart",
        CHECKOUT: "/cart/confirm",
    },
    ORDER: {
        CONFIRMATION: "/order/confirmation",
    },
    MARKET: {
        PRODUCT: "/market/product/:id",
        CATEGORY: "/market/:category",
        BY_CATEGORY: (category: string) => `/market/${category}`,
        BY_PRODUCT_ID: (id: number) => `/market/product/${id}`,
        WISHLIST: "/market/wishlist",
    },
};
