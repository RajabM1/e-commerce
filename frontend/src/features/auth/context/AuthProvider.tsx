import { PropsWithChildren } from "react";
import {
    getAccessToken,
    removeTokens,
    setTokens,
} from "../../../utils/jwtHelpers";
import AuthContext from "./AuthContext";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import * as Services from "./services";
import { queryKeys } from "../../../config/query";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const authToken = getAccessToken();

    const { data: currentUser, isLoading: isUserLoading } = useQuery({
        enabled: !!authToken,
        queryKey: [queryKeys.CURRENT_USER],
        queryFn: () => Services.fetchCurrentUser(authToken),
    });

    const handleLogin = useMutation({
        mutationFn: Services.login,
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token);
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CURRENT_USER],
            });
        },
    }).mutateAsync;

    const handleRegister = useMutation({
        mutationFn: Services.register,
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token);
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CURRENT_USER],
            });
        },
    }).mutateAsync;

    const handleForgetPassword = useMutation({
        mutationFn: Services.forgetPassword,
    }).mutateAsync;

    const handleResetPassword = useMutation({
        mutationFn: Services.resetPassword,
    }).mutateAsync;

    const { status: logoutStatus, mutateAsync: handleLogout } = useMutation({
        mutationFn: Services.logout,
        onSettled: () => {
            queryClient.clear();
            removeTokens();
        },
    });

    const valueToReturn = {
        isLoading: isUserLoading || logoutStatus === "pending",
        authToken,
        currentUser,
        handleRegister,
        handleLogin,
        handleForgetPassword,
        handleResetPassword,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={valueToReturn}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
