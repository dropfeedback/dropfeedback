import axios, { AxiosError } from "axios";
import * as validators from "./validators";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3001";

export const axiosInstance = axios.create({
  withCredentials: true,
});

const createProject = async (payload: validators.ProjectPayload) => {
  const { data } = await axiosInstance.post<validators.ProjectResponse>(
    `${BASE_URL}/projects`,
    payload,
  );
  return data;
};

const getProjects = async () => {
  const { data } = await axiosInstance.get<validators.GetProjectsResponse>(
    `${BASE_URL}/projects`,
  );
  return data;
};

const getFeedbacks = async ({ projectId }: validators.GetFeedbacksParams) => {
  const { data } = await axiosInstance.get<validators.GetFeedbacksResponse>(
    `${BASE_URL}/feedbacks?projectId=${projectId}`,
  );
  return data;
};

const me = async () => {
  const { data } = await axiosInstance.get<validators.MeResponse>(
    `${BASE_URL}/auth/me`,
  );
  return data;
};

const signup = async (payload: validators.AuthPayload) => {
  const { data } = await axiosInstance.post<validators.AuthResponse>(
    `${BASE_URL}/auth/local/signup`,
    payload,
  );
  return data;
};

const signin = async (payload: validators.AuthPayload) => {
  const { data } = await axiosInstance.post<validators.AuthResponse>(
    `${BASE_URL}/auth/local/signin`,
    payload,
  );
  return data;
};

const refreshTokens = async () => {
  const { data } = await axiosInstance.post(`${BASE_URL}/auth/refresh`);

  return data;
};

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
      window.location.replace("/signin");
      return Promise.reject(error);
    }

    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };
    if (response.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      await refreshTokens();
      return axiosInstance(originalRequest);
    }

    console.log(response);

    toast.error(response.data.message, { id: response.data.message });
    return Promise.reject(error);
  },
);

export const api = {
  createProject,
  getProjects,
  getFeedbacks,
  me,
  signup,
  signin,
  refreshTokens,
};

export type ApiError = AxiosError<{
  error: string;
  message: string;
  statusCode: number;
}>;

export type { validators };
export * from "./hooks";
