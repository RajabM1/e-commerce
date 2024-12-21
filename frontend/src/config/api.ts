const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const endpoints = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        ME: `${API_BASE_URL}/auth/me`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
        FORGET_PASSWORD: `${API_BASE_URL}/auth/forget-password`,
        RESET_PASSWORD: (token: string) =>
            `${API_BASE_URL}/auth/reset-password/${token}`,
    },
    PRODUCT: {
        BY_CATEGORY: (category: string) => `${API_BASE_URL}/items/${category}`,
        BY_ID: (id: number) => `${API_BASE_URL}/items/${id}`,
        ALL: `${API_BASE_URL}/items`,
        ON_DISCOUNT: `${API_BASE_URL}/items/on-discount`,
    },
    CATEGORY: {
        ALL: `${API_BASE_URL}/categories`,
    },
    SHIPPING_CART: {
        CART_ITEMS: `${API_BASE_URL}/cart/items`,
        DELETE_CART_ITEMS_BY_ID: (id: number) =>
            `${API_BASE_URL}/cart/items/${id}`,
        DELETE: `${API_BASE_URL}/cart`,
        GET: `${API_BASE_URL}/cart`,
    },
    COUPONS: {
        APPLY: `${API_BASE_URL}/coupons/apply`,
    },
    USER: {
        ADDRESSES: `${API_BASE_URL}/users/addresses`,
        ADDRESSES_BY_ID: (id: string) =>
            `${API_BASE_URL}/users/addresses/${id}`,
    },
    ORDER: {
        CREATE: `${API_BASE_URL}/orders`,
        SHIPPING_METHODS: `${API_BASE_URL}/orders/shipping-methods`,
        SHIPPING_METHODS_BY_ID: (id: string) =>
            `${API_BASE_URL}/orders/shipping-methods/${id}`,
        BY_TRACKING_CODE: (orderCode: string) =>
            `${API_BASE_URL}/orders/${orderCode}`,
    },
    STRIPE: {
        UPDATE_PAYMENT_INTENT: `${API_BASE_URL}/stripe/update-payment-intent`,
        CREATE_PAYMENT_INTENT: `${API_BASE_URL}/stripe/create-payment-intent`,
        CONFIG: `${API_BASE_URL}/stripe/config`,
    },
};

export default endpoints;
