import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Logout from "../components/Logout";
import { API_PATHS } from "../PATHS";

function Home() {
  const { loading, backendApiCall, data, error } = useAxios();

  async function fetchApiData() {
    try {
      await backendApiCall({
        method: "GET",
        url: API_PATHS.SCOPED,
      });
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      ) : (
        <div>API data : {JSON.stringify(data)}</div>
      )}
      <Logout />
    </>
  );
}

export default Home;
