import axios, { type AxiosError } from "axios";
import { fetchers } from "~/lib/fetchers";

const BASE_URL = "http://localhost:8080";

export type ApiError = AxiosError<{
  error: string;
  message: string;
  statusCode: number;
}>;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// refresh tokens if 401
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: ApiError) {
    const response = error?.response;
    if (!response) {
      return Promise.reject(error);
    }

    const status = response.status;

    // API returns 403 when could not refresh tokens.
    if (status === 403) {
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }

    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (response.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      await fetchers.refreshToken();
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);
