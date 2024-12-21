import HttpService from "../../../service/HttpService";
import endpoints from "../../../config/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";

export const useProduct = () => {
    const fetchItems = async () => {
        const response = await HttpService.getRequest(endpoints.PRODUCT.ALL);
        return response.data;
    };

    const fetchItemsOnDiscount = async () => {
        const response = await HttpService.getRequest(
            endpoints.PRODUCT.ON_DISCOUNT
        );
        return response.data;
    };

    const { data: items } = useQuery({
        initialData: [],
        queryKey: [queryKeys.PRODUCTS],
        queryFn: () => fetchItems(),
    });

    const { data: itemsOnDiscount } = useQuery({
        initialData: [],
        queryKey: [queryKeys.ON_DISCOUNT_PRODUCTS],
        queryFn: () => fetchItemsOnDiscount(),
    });

    return {
        items,
        itemsOnDiscount,
    };
};
