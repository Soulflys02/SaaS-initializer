import useUser from "../../../hooks/useUser";

function LoginForm() {
  const { loading, error, login } = useUser();

  function handleSubmit(formData: FormData) {
    login(formData.get("email"), formData.get("password"));
  }

  return (
    <>
      <form action={handleSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </div>
      )}
    </>
  );
}

export default LoginForm;
