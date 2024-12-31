import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as productServices from "../services/productServices";

export const useProductsOnDiscountQuery = () => {
    const productsOnDiscountQuery = useQuery({
        initialData: [],
        queryKey: [queryKeys.ON_DISCOUNT_PRODUCTS],
        queryFn: () => productServices.fetchProductsOnDiscount(),
    });

    return productsOnDiscountQuery;
};
