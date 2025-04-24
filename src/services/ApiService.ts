import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import axios from "axios";
import BaseService from "./BaseService";

const pendingRequests = new Map<string, CancelTokenSource>();

const generateRequestKey = (config: AxiosRequestConfig) => {
  const method = config.method?.toUpperCase();
  const url = config.url;
  return `${method}:${url}`;
};

const ApiService = {
  cancelRequest(requestKey: string) {
    if (pendingRequests.has(requestKey)) {
      const source = pendingRequests.get(requestKey);
      source?.cancel();
      pendingRequests.delete(requestKey);
    }
  },

  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ) {
    const requestKey = generateRequestKey(param);

    this.cancelRequest(requestKey);

    const source = axios.CancelToken.source();
    pendingRequests.set(requestKey, source);

    const updatedParam = {
      ...param,
      cancelToken: source.token,
    };

    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      BaseService(updatedParam)
        .then((response: AxiosResponse<Response>) => {
          pendingRequests.delete(requestKey);
          resolve(response);
        })
        .catch((error: AxiosError) => {
          if (!axios.isCancel(error)) {
            pendingRequests.delete(requestKey);
            reject(error);
          }
        });
    });
  },
};

export default ApiService;
