import { createContext } from "react";
import { IAuthContext } from "./types";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;
