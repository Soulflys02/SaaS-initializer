import useUserStore from "../stores/useUserStore";
import useAxios from "../hooks/useAxios";
import { API_PATHS } from "../PATHS";
import { useState } from "react";

function Logout() {
  const clearUser = useUserStore((state) => state.clearUser);
  const [error, setError] = useState<string>();
  const { backendApiCall, loading } = useAxios();

  return (
    <>
      <button
        onClick={async () => {
          try {
            await backendApiCall({
              method: "DELETE",
              url: API_PATHS.LOGOUT,
            });
            clearUser();
          } catch (err: any) {
            if (err.response && err.response.status === 401) {
              clearUser();
            } else {
              setError(err.message || "Erreur lors du logout");
            }
          }
        }}
      >
        Logout
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
}

export default Logout;
