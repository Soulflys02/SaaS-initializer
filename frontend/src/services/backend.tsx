import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

backend.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    console.log(accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backend;
