import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// ADD CSRF TOKEN TO ALL POST, PUT, DELETE, PATCH REQUESTS
let csrfPromise: Promise<any> | null = null;
backend.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();
  if (["POST", "PUT", "DELETE", "PATCH"].includes(method || "")) {
    if (!csrfPromise) {
      csrfPromise = backend.get("/auth/csrf/").finally(() => {
        csrfPromise = null;
      });
    }
    await csrfPromise;
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }
  return config;
});

export default backend;
