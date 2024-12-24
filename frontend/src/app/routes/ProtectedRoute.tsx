import { PropsWithChildren } from "react";
import { getUserRole } from "../../utils/jwtHelpers";
import UnauthorizedPage from "../../features/errors/pages/UnauthorizedPage";
import { useAuth } from "../../features/auth/context";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles: Array<string>;
};

export default function ProtectedRoute({
    allowedRoles,
    children,
}: ProtectedRouteProps) {
    const { currentUser } = useAuth();

    if (currentUser === undefined) {
        return <div>Loading...</div>;
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
}
