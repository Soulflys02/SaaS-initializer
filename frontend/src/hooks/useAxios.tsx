import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import backend from "../services/backend";

function useAxios<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await backend(config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useAxios;
