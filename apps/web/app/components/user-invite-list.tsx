import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchers } from "~/lib/fetchers";
import type { ProjectInvite } from "~/types";
import { UserInviteCard } from "./user-invite-card";

type UserInviteListProps = {
  className?: string;
};

export const UserInviteList: FC<UserInviteListProps> = ({ className }) => {
  const { data: invites } = useQuery<ProjectInvite[]>({
    queryKey: ["user-invites"],
    queryFn: () => fetchers.getUserInvites(),
  });

  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      {invites?.map((invite) => {
        return <UserInviteCard key={invite.id} {...invite} />;
      })}
    </div>
  );
};
