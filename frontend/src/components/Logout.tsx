import useUserStore from "../stores/useUserStore";
import useAxios from "../hooks/useAxios";
import { API_PATHS } from "../PATHS";

function Logout() {
  const clearUser = useUserStore((state) => state.clearUser);
  const { fetchData, error, loading } = useAxios();

  return (
    <>
      <button
        onClick={async () => {
          const response = await fetchData({
            method: "POST",
            url: API_PATHS.LOGOUT,
          });
          if (response.status === 200) {
            clearUser();
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
