export type Project = {
  id: string;
  name: string;
  role: ProjectMemberRole;
  feedbackCount: number;
  createdAt: string;
};

export enum ProjectMemberRole {
  owner,
  manager,
  member,
}

export enum MemberInviteState {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export type MeResponse = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type ProjectVariables = {
  name: string;
};

export type ProjectResponse = {
  id: string;
  name: string;
  createdAt: string;
};

export type Feedback = {
  id: string;
  projectId: string;
  content: string;
  createdAt: string;
  device: string;
  origin: string;
  meta?: Record<string, any> | null;
};

export type FeedbackQueryType = {
  data: Feedback[];
  nextCursor?: string;
  prevCursor?: string;
  total: number;
};

export type ProjectInvite = {
  id: string;
  projectId: string;
  projectName: string;
  email: string;
  role: ProjectMemberRole;
  state: MemberInviteState;
};
