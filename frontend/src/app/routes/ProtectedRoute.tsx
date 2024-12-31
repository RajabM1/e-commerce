import { lazy, PropsWithChildren } from "react";
import { getUserRole } from "../../utils/jwtHelpers";
import { useAuth } from "../../features/auth/context";

const UnauthorizedPage = lazy(
    () => import("../../features/errors/pages/UnauthorizedPage")
);
const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles: Array<string>;
};

export const ProtectedRoute = ({
    allowedRoles,
    children,
}: ProtectedRouteProps) => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (currentUser === undefined && allowedRoles.includes("guest")) {
        return children;
    }

    if (currentUser === undefined) {
        return <LoginPage />;
    }

    if (
        currentUser &&
        allowedRoles &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(getUserRole(currentUser))
    ) {
        return <UnauthorizedPage />;
    }

    return children;
};
