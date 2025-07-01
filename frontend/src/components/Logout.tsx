import useUser from "../hooks/useUser";

function Logout() {
  const { loading, error, logout } = useUser();
  return (
    <>
      <button onClick={logout}>Logout</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </>
  );
}

export default Logout;
