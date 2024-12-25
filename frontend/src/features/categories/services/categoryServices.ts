import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchCategoryItem = async (category: string) => {
    const response = await HttpService.getRequest(
        endpoints.PRODUCT.BY_CATEGORY(category)
    );
    return response.data;
};
