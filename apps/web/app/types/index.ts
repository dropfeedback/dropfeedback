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
  fullName?: string;
  avatarUrl?: string;
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
  category: FeedbackCategory;
  status: FeedbackStatus;
};

export type FeedbackQueryType = {
  data: Feedback[];
  nextCursor?: string;
  prevCursor?: string;
  countAll: number;
  countCurrent: number;
  countArchived: number;
  countNew: number;
  countIdea: number;
  countIssue: number;
  countOther: number;
};

export enum FeedbackCategory {
  other = "other",
  issue = "issue",
  idea = "idea",
}

export enum FeedbackStatus {
  new = "new",
  archived = "archived",
}

export type ProjectInvite = {
  id: string;
  projectId: string;
  projectName: string;
  email: string;
  role: ProjectMemberRole;
  state: MemberInviteState;
};

export type InviteMemberVariables = {
  email: string;
  role: keyof typeof ProjectMemberRole;
};

export type ProjectMember = {
  id: string;
  email: string;
  role: ProjectMemberRole;
  fullName: string;
  avatarUrl: string;
};

export type ProjectTeam = {
  invites: Omit<ProjectInvite, "projectId" | "projectName">[];
  members: ProjectMember[];
};
