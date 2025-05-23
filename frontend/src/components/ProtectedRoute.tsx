import { Navigate, Outlet } from "react-router";
import useUserStore from "../stores/useUserStore";
import { PATHS } from "../PATHS";
import { useEffect } from "react";
import backend from "../services/backend";

function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await backend.get("/auth/user/");
        setUser(response.data.user);
      } catch {
        clearUser();
      }
    }
    fetchUser();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
