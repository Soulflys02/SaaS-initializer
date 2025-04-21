import useAxios from "../../../hooks/useAxios";

type JWT = {
  refresh: string;
  access: string;
};

function LoginForm() {
  const { data, error, loading, fetchData } = useAxios<JWT>();

  function handleSubmit(formData: FormData) {
    fetchData({
      method: "POST",
      url: "/auth/token/",
      data: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });
  }

  return (
    <>
      <form action={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {data && (
            <div>
              <p>access: {data.access}</p>
              <p>refresh: {data.refresh}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LoginForm;
