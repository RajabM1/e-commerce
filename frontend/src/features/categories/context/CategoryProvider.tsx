import { PropsWithChildren } from "react";
import CategoryContext from "./CategoryContext";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as Services from "./services";
import { useAuth } from "../../auth/context";

const CategoryProvider = ({ children }: PropsWithChildren) => {
    const { currentUser } = useAuth();
    const { data: categories } = useQuery({
        initialData: [],
        enabled: !!currentUser,
        queryKey: [queryKeys.CATEGORIES],
        queryFn: () => Services.fetchCategories(),
    });

    const valueToReturn = {
        categories,
    };

    return (
        <CategoryContext.Provider value={valueToReturn}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
