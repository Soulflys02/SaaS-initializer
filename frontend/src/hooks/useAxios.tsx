import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import backend from "../services/backend";

function useAxios<T = any>() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async (config: AxiosRequestConfig) => {
    setLoading(true);

    try {
      const response: AxiosResponse<T> = await backend(config);
      setData(response.data);
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useAxios;
