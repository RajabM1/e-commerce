import { useContext } from "react";
import CategoryContext from "./CategoryContext";

const useCategory = () => {
    const context = useContext(CategoryContext);

    if (context === undefined) {
        throw new Error(
            "useCategory must be used inside of a CategoryProvider"
        );
    }

    return context;
};

export default useCategory;
