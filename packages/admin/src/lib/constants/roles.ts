import { ProjectMemberRole } from "@/types";

export const ROLES = [
  {
    value: ProjectMemberRole.member,
    name: "Member",
    description: "Can view the project and its feedback.",
  },
  {
    value: ProjectMemberRole.manager,
    name: "Manager",
    description: "Can add/remove members and change roles.",
  },
  {
    value: ProjectMemberRole.owner,
    name: "Owner",
    description:
      "Can add/remove members, change roles, and delete the project.",
  },
];
