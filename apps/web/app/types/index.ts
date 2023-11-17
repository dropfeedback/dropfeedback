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
