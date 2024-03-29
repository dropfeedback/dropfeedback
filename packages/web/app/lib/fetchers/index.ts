import { axiosInstance } from "~/lib/axios";
import {
  type OrderBy,
  type FeedbackCategory,
  type FeedbackStatus,
  type ProjectVariables,
  type VerifyEmailPayload,
  type ProjectMemberRole,
} from "~/types";
import Cookies from "js-cookie";

const getProjects = async () => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};

const getProject = async (projectId: string) => {
  const { data } = await axiosInstance.get(`/projects/${projectId}`);
  return data;
};

const updateProject = async (projectId: string, payload: ProjectVariables) => {
  const { data } = await axiosInstance.patch(`/projects/${projectId}`, payload);
  return data;
};

const deleteProject = async (projectId: string) => {
  const { data } = await axiosInstance.delete(`/projects/${projectId}`);
  return data;
};

const leaveProject = async (projectId: string) => {
  const { data } = await axiosInstance.delete(
    `/projects/${projectId}/leave-project`,
  );
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
  const { data } = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

const updateUser = async (payload: { fullName: string }) => {
  const { data } = await axiosInstance.patch("/users/me", payload);
  return data;
};

const signup = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signup", payload);
  setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data;
};

const signin = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signin", payload);
  setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data;
};

const verifyEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await axiosInstance.post(
    "/auth/local/verify-email",
    payload,
  );
  return data;
};

const resendVerificationEmail = async () => {
  const { data } = await axiosInstance.post(
    "/auth/local/send-verification-email",
  );
  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  removeAuthCookies();
  return data;
};

const refreshToken = async () => {
  const { data } = await axiosInstance.post("/auth/refresh");
  setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data;
};

const googleLogin = async (payload: { idToken: string }) => {
  const { data } = await axiosInstance.post("/auth/google/login", payload);
  setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data;
};

const getFeedbacks = async ({
  projectId,
  params,
}: {
  projectId: string;
  params: {
    cursor: string;
    take: number;
    search?: string;
    category?: FeedbackCategory;
    status?: FeedbackStatus;
    orderBy?: OrderBy;
  };
}) => {
  const { data } = await axiosInstance.get(`/projects/${projectId}/feedbacks`, {
    params,
  });

  return data;
};

const getFeedback = async ({
  projectId,
  feedbackId,
}: {
  projectId: string;
  feedbackId: string;
}) => {
  const { data } = await axiosInstance.get(
    `/projects/${projectId}/feedbacks/${feedbackId}`,
  );
  return data;
};

const updateFeedbackStatus = async (payload: {
  id: string;
  projectId: string;
  status: FeedbackStatus;
}) => {
  const { data } = await axiosInstance.patch(
    `/projects/${payload.projectId}/feedbacks/${payload.id}/status`,
    payload,
  );
  return data;
};

const inviteMember = async (
  projectId: string,
  payload: { email: string; role: string },
) => {
  const { data } = await axiosInstance.post(
    `/projects/${projectId}/invite`,
    payload,
  );
  return data;
};

const deleteMember = async (projectId: string, memberId: string) => {
  const { data } = await axiosInstance.delete(
    `/projects/${projectId}/member/${memberId}`,
  );
  return data;
};

const updateMemberRole = async (
  projectId: string,
  memberId: string,
  payload: {
    role: ProjectMemberRole;
  },
) => {
  const { data } = await axiosInstance.patch(
    `/projects/${projectId}/member/${memberId}`,
    payload,
  );
  return data;
};

const cancelInvite = async (projectId: string, inviteId: string) => {
  const { data } = await axiosInstance.delete(
    `/projects/${projectId}/invite/${inviteId}`,
  );
  return data;
};

const getProjectTeam = async (projectId: string) => {
  const { data } = await axiosInstance.get(`/projects/${projectId}/team`);
  return data;
};

export const setAuthCookies = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  Cookies.set("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    secure: true,
    expires: 2,
  });
  Cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    secure: true,
    expires: 7,
  });
};

export const removeAuthCookies = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const fetchers = {
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  leaveProject,
  createProject,
  getUserInvites,
  acceptInvite,
  rejectInvite,
  me,
  updateUser,
  signup,
  signin,
  verifyEmail,
  resendVerificationEmail,
  logout,
  refreshToken,
  googleLogin,
  getFeedbacks,
  getFeedback,
  updateFeedbackStatus,
  inviteMember,
  deleteMember,
  updateMemberRole,
  cancelInvite,
  getProjectTeam,
};
