import { useState } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import backend from "../services/backend";

function useAxios<T = any>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  async function backendApiCall(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<T> = await backend(config);
      setData(response.data);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { backendApiCall, loading, data, error, setData };
}

export default useAxios;
