import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import backend from "../services/backend";

function useAxios<T = any>() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await backend(config);
      return response.data as T;
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, fetchData };
}

export default useAxios;
