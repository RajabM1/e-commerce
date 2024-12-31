import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";

export const fetchCategories = async () => {
    try {
        const response = await HttpService.getRequest(endpoints.CATEGORY.ALL);
        return response.data;
    } catch {
        console.log("Failed to fetch categories.");
    }
};
