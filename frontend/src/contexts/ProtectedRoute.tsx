import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserRole } from '../utils/jwtHelpers';
import UnauthorizedPage from '../pages/errors/UnauthorizedPage';

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: Array<string>;
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
        (allowedRoles && !allowedRoles.includes(getUserRole()))
    ) {
        return <UnauthorizedPage />;
    }

    return children;
}