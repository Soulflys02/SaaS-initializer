import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

function Home() {
  const { error, loading, fetchData } = useAxios();
  const [apiData, setApiData] = useState();

  async function fetchApiData() {
    const response = await fetchData({
      method: "GET",
      url: "/api/scoped/",
    });
    console.log(response);
    setApiData(response);
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
        <div>API data : {JSON.stringify(apiData)}</div>
      )}
    </>
  );
}

export default Home;
