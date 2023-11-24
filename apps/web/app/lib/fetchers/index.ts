import { axiosInstance } from "~/lib/axios";
import { type ProjectVariables } from "~/types";

const getProjects = async () => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};

const createProject = async (payload: ProjectVariables) => {
  const { data } = await axiosInstance.post("/projects", payload);
  return data;
};

const getUserInvites = async () => {
  const { data } = await axiosInstance.get("/projects/current-user-invites");
  return data;
};

const acceptInvite = async ({ projectId }: { projectId: string }) => {
  const { data } = await axiosInstance.post(
    `/projects/${projectId}/accept-invite`,
  );
  return data;
};

const rejectInvite = async ({ projectId }: { projectId: string }) => {
  const { data } = await axiosInstance.post(
    `/projects/${projectId}/reject-invite`,
  );
  return data;
};

const me = async (cookie?: string) => {
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

const signup = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signup", payload);
  return data;
};

const signin = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signin", payload);
  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

const refreshToken = async () => {
  const { data } = await axiosInstance.post("/auth/refresh");
  return data;
};

const googleLogin = async (payload: { idToken: string }) => {
  const { data } = await axiosInstance.post("/auth/google/login", payload);
  return data;
};

const getFeedbacks = async (params: {
  projectId: string;
  cursor: string;
  take: number;
}) => {
  const { data } = await axiosInstance.get("/feedbacks", {
    params,
  });

  return data;
};

export const fetchers = {
  getProjects,
  createProject,
  getUserInvites,
  acceptInvite,
  rejectInvite,
  me,
  signup,
  signin,
  logout,
  refreshToken,
  googleLogin,
  getFeedbacks,
};
