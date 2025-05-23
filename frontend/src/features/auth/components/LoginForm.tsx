import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useUserStore from "../../../stores/useUserStore";
import { User } from "../../../types/user";
import { PATHS, API_PATHS } from "../../../PATHS";
import { useState } from "react";

function LoginForm() {
  const { loading, backendApiCall } = useAxios();
  const [error, setError] = useState<string>();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  async function handleSubmit(formData: FormData) {
    // Obtain token
    const response = await backendApiCall({
      method: "POST",
      url: API_PATHS.LOGIN,
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    if (response.status === 200) {
      // Retrieve user data
      const userResponse = await backendApiCall({
        method: "GET",
        url: API_PATHS.USER,
      });
      if (userResponse.status === 200) {
        // Set user in store
        setUser(userResponse.data.user as User);
        navigate(PATHS.HOME, { replace: true });
      } else {
        setError(userResponse.data.error);
      }
    } else {
      setError(response.data.error);
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
        <div>{error && <p style={{ color: "red" }}>Error: {error}</p>}</div>
      )}
    </>
  );
}

export default LoginForm;
