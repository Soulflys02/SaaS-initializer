import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useUserStore from "../../../stores/useUserStore";
import { User } from "../../../types/user";
import { PATHS, API_PATHS } from "../../../PATHS";

function LoginForm() {
  const { error, loading, fetchData } = useAxios();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  async function handleSubmit(formData: FormData) {
    const response = await fetchData({
      method: "POST",
      url: API_PATHS.LOGIN,
      data: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });
    if (response.status === 200) {
      const user: User = response.data.user;
      setUser(user);
      navigate(PATHS.HOME);
    }
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
