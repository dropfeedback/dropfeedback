import { z } from "zod";

export type MeResponse = {
  id: string;
  email: string;
};

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthPayload = z.infer<typeof AuthSchema>;
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export const AuthGoogleSchema = z.object({
  idToken: z.string(),
});
export type AuthGooglePayload = z.infer<typeof AuthGoogleSchema>;

export const ProjectSchema = z.object({
  name: z.string().min(3),
});
export type ProjectPayload = z.infer<typeof ProjectSchema>;
export type Project = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
};
export type ProjectResponse = Project;
export type GetProjectsResponse = Project[];

export type Feedback = {
  id: string;
  content: string;
  origin: string;
  device: string;
  meta?: Record<string, any>;
  createdAt: string;
  projectId: string;
  project: Project;
};
export type GetFeedbacksParams = {
  projectId?: string;
  search?: string;
};
export type GetFeedbacksResponse = Feedback[];
