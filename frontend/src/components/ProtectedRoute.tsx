import { Navigate } from "react-router";
import useUserStore from "../stores/useUserStore";
import { JSX } from "react";
import { PATHS } from "../PATHS";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }
  return children;
}

export default ProtectedRoute;
