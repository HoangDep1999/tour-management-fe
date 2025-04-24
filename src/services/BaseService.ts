import appConfig from "@/configs/app.config";
import store from "@/store/storeSetup";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const REQUEST_TIMEOUT = 60000;

// interface RefreshTokenResponse {
//   access_token: string;
//   refresh_token: string;
// }

const BaseService: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + appConfig.apiPrefix,
  timeout: REQUEST_TIMEOUT,
});

// let isRefreshing = false;

BaseService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().auth.session.act;
    console.log("🚀 ~ accessToken:", accessToken);

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// BaseService.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const { response, config } = error;
//     if (!config) return Promise.reject(error);
//     const { refreshToken, signedIn } = store.getState().auth.session;
//     if (response?.status && signedIn) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const { data } = await apiRefreshToken(refreshToken);
//           const { access_token, refresh_token } = data as RefreshTokenResponse;

//           store.dispatch(
//             signInSuccess({ act: access_token, rft: refresh_token })
//           );

//           // Process queued requests
//           processQueue(null, access_token);

//           // Retry current request
//           if (config.headers) {
//             config.headers[
//               REQUEST_HEADER_AUTH_KEY
//             ] = `${TOKEN_TYPE}${access_token}`;
//           }
//           return BaseService(config as AxiosRequestConfig);
//         } catch (error) {
//           return Promise.reject(error);
//         } finally {
//           isRefreshing = false;
//         }
//       }
//     }
//   }
// );

export default BaseService;
