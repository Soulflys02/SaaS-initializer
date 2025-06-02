import useUser from "../../../hooks/useUser";

function RegisterForm() {
  const { loading, error, register } = useUser();

  async function handleSubmit(formData: FormData) {
    register(formData.get("email"), formData.get("password"));
  }

  return (
    <>
      <form action={handleSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Register</button>
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

export default RegisterForm;
