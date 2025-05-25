import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { API_PATHS, PATHS } from "../PATHS";
import { AxiosError } from "axios";
import useUserStore from "../stores/useUserStore";
import { User } from "../types/user";

function ConfirmEmail() {
  const { key } = useParams<{ key: string }>();
  const { loading, backendApiCall, error } = useAxios();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  async function validateKey(key: string | undefined) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.CONFIRM_EMAIL,
        data: { key },
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
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status !== 401) {
        console.error("Error confirming email:", error);
      }
    }
  }

  useEffect(() => {
    validateKey(key);
  }, [key]);
  return (
    <>
      {loading ? <p>Loading ...</p> : null}
      {error && error.status !== 401 ? (
        <p style={{ color: "red" }}>
          Error: {error.message || "Erreur inconnue"}
        </p>
      ) : (
        <p>
          Email confirmed successfully! You can now{" "}
          <Link to={PATHS.AUTH}>login</Link>
        </p>
      )}
    </>
  );
}

export default ConfirmEmail;
