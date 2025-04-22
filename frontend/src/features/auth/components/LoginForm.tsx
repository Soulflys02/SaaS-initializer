import useAxios from "../../../hooks/useAxios";
import useAuthStore from "../../../stores/useAuthStore";

type JWT = {
  refresh: string;
  access: string;
};

function LoginForm() {
  const { error, loading, fetchData } = useAxios<JWT>();
  const setTokens = useAuthStore((state) => state.setTokens);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  async function handleSubmit(formData: FormData) {
    const tokens = await fetchData({
      method: "POST",
      url: "/auth/token/",
      data: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    });

    if (tokens) {
      setTokens(tokens.access, tokens.refresh); // Update tokens after data is available
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
        <div>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {isAuthenticated && (
            <div>
              <p>access: {accessToken}</p>
              <p>refresh: {refreshToken}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LoginForm;
