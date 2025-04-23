import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Logout from "../components/Logout";

function Home() {
  const { data, error, loading, fetchData } = useAxios();

  async function fetchApiData() {
    await fetchData({
      method: "GET",
      url: "/api/scoped/",
    });
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
