import {Navigate} from "react-router-dom";
import useAuthStore from "@/store/authStore.ts";

type UnProtectedRouteProps = {
    children: React.ReactNode;
};

const UnProtectedRoute = ({children}: UnProtectedRouteProps) => {
    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to={`/activity`} replace/>;
    }

    return <>{children}</>;
};

export default UnProtectedRoute;