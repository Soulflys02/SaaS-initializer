import { AxiosError } from "axios";
import { API_PATHS, PATHS } from "../PATHS";
import useUserStore from "../stores/useUserStore";
import { User } from "../types/user";
import useAxios from "./useAxios";
import { useNavigate } from "react-router";

function useUser() {
  const { loading, error, backendApiCall } = useAxios();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  async function login(
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.LOGIN,
        data: {
          email: email,
          password: password,
        },
      });
      try {
        await fetchUser();
        navigate(PATHS.HOME, { replace: true });
      } catch (error) {
        console.error("Error retrieving user data after login:", error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function logout() {
    try {
      await backendApiCall({
        method: "DELETE",
        url: API_PATHS.LOGOUT,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        clearUser();
      } else {
        console.error("Error during logout:", error);
      }
    }
  }

  async function register(
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.REGISTER,
        data: {
          email: email,
          password: password,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  async function confirmEmail(key: string | undefined) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.CONFIRM_EMAIL,
        data: { key },
      });
      try {
        await fetchUser();
        navigate(PATHS.HOME, { replace: true });
      } catch (error) {
        console.error("Error fetching user after email confirmation:", error);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status !== 401) {
        console.error("Error confirming email:", error);
      }
    }
  }

  async function requestPasswordReset(email: FormDataEntryValue | null) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.REQUEST_PASSWORD_RESET,
        data: { email },
      });
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  }

  async function resetPassword(
    key: string | undefined,
    password: FormDataEntryValue | null
  ) {
    try {
      await backendApiCall({
        method: "POST",
        url: API_PATHS.RESET_PASSWORD,
        data: { key: key, password: password },
      });
      try {
        await fetchUser();
        navigate(PATHS.HOME, { replace: true });
      } catch (error) {
        console.error("Error fetching user after password reset:", error);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status !== 401) {
        console.error("Error on password reset:", error);
      } else if (axiosError.status === 401) {
        return true;
      }
    }
  }

  async function fetchUser() {
    try {
      const response = await backendApiCall({
        method: "GET",
        url: API_PATHS.USER,
      });
      setUser(response.data.user as User);
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  }

  return {
    loading,
    error,
    confirmEmail,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
  };
}

export default useUser;
