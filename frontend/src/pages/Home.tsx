import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Logout from "../components/Logout";
import { API_PATHS } from "../PATHS";

function Home() {
  const { loading, backendApiCall } = useAxios();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchApiData() {
    const response = await backendApiCall({
      method: "GET",
      url: API_PATHS.SCOPED,
    });
    if (response.status === 200) {
      setData(response.data);
    } else {
      setError(response.data.error);
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
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div>API data : {JSON.stringify(data)}</div>
      )}
      <Logout />
    </>
  );
}

export default Home;
