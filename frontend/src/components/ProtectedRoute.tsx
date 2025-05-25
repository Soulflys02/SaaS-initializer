import { Navigate, Outlet } from "react-router";
import useUserStore from "../stores/useUserStore";
import { API_PATHS, PATHS } from "../PATHS";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";

function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { backendApiCall } = useAxios();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await backendApiCall({
          method: "GET",
          url: API_PATHS.USER,
        });
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
