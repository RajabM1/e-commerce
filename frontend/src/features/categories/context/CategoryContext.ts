import { createContext } from "react";
import { ICategoryContext } from "./types";

const CategoryContext = createContext<ICategoryContext | undefined>(undefined);

export default CategoryContext;
