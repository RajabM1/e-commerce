import { useCategory } from "../context";

export const useValidCategory = (category: string) => {
    const { categories } = useCategory();
    return categories.some((cat) => cat.name === category);
};
