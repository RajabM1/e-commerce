import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as productServices from "../services/productServices";

export const useProductsQuery = () => {
    const productsQuery = useQuery({
        initialData: [],
        queryKey: [queryKeys.PRODUCTS],
        queryFn: () => productServices.fetchProducts(),
    });

    return productsQuery;
};
