import { Navigate, Outlet } from "react-router";
import useUserStore from "../stores/useUserStore";
import { PATHS } from "../PATHS";

function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
