import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

backend.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await backend.post("auth/refresh/");
        return backend.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default backend;
