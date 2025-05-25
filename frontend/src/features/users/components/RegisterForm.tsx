import useAxios from "../../../hooks/useAxios";
import { API_PATHS } from "../../../PATHS";

function RegisterForm() {
  const { loading, backendApiCall, error } = useAxios();

  async function handleSubmit(formData: FormData) {
    // Obtain token
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.REGISTER,
        data: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
    } catch (err) {
      console.error("Register failed:", err);
    }
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
