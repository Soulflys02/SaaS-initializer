import useAxios from "../../../hooks/useAxios";

type JWT = {
  refresh: string;
  access: string;
};

function LoginForm() {
  const { error, loading, fetchData } = useAxios<JWT>();

  async function handleSubmit(formData: FormData) {
    const tokens = await fetchData({
      method: "POST",
      url: "auth/login/",
      data: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });
    console.log(tokens);
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
        <div>{error && <p style={{ color: "red" }}>Error: {error}</p>}</div>
      )}
    </>
  );
}

export default LoginForm;
