import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as productServices from "../services/productServices";

export const useProductByIdQuery = (productId: number) => {
    const productByIdQuery = useQuery({
        queryKey: [queryKeys.PRODUCT, productId],
        queryFn: () => productServices.fetchProductById(productId),
    });

    return productByIdQuery;
};
