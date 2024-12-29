import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as Services from "../services/categoryServices";

export const useCategoryProductsQuery = (
    category?: string,
    enabled: boolean = true
) => {
    const categoryProductsQuery = useQuery({
        queryKey: [queryKeys.CATEGORY_ITEMS, { category }],
        queryFn: () => Services.fetchCategoryItem(category ?? "Other"),
        enabled,
    });

    return categoryProductsQuery;
};
