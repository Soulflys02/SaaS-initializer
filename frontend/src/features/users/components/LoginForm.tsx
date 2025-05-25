import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useUserStore from "../../../stores/useUserStore";
import { User } from "../../../types/user";
import { PATHS, API_PATHS } from "../../../PATHS";

function LoginForm() {
  const { loading, backendApiCall, error } = useAxios();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  async function handleSubmit(formData: FormData) {
    // Obtain token
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.LOGIN,
        data: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
      try {
        // Retrieve user data
        const userResponse = await backendApiCall({
          method: "GET",
          url: API_PATHS.USER,
        });
        // Set user in store
        setUser(userResponse.data.user as User);
        navigate(PATHS.HOME, { replace: true });
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
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
