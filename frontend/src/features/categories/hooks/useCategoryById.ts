import { useCategory } from "../context";

export const useCategoryById = (id: number) => {
    const { categories } = useCategory();
    return categories.find((category) => category.id === id);
};
