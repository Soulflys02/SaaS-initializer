import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import backend from "../services/backend";

function useAxios() {
  const [loading, setLoading] = useState(false);

  async function backendApiCall(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<any, any>> {
    setLoading(true);
    const response: AxiosResponse<any, any> = await backend(config);
    setLoading(false);
    return response;
  }

  return { backendApiCall, loading };
}

export default useAxios;
