import axios, { type AxiosError } from "axios";
import { fetchers } from "~/lib/fetchers";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://feedbacky-production.up.railway.app"
    : "http://localhost:8080";

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

    const status = response?.status;
    const message = response?.data?.message;

    if (typeof window !== "undefined") {
      // API returns 401 and message is "Invalid refresh token". redirect to login
      if (status === 401 && message === "Invalid refresh token") {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }

      // API returns 403 and message is "Email is not verified". redirect to /email-verification
      if (status === 403 && message === "Email is not verified") {
        if (window.location.pathname !== "/dashboard/email-verification") {
          window.location.replace("/dashboard/email-verification");
        }
        return Promise.reject(error);
      }
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