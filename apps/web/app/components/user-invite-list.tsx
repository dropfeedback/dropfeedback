import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { UserInviteCard } from "./user-invite-card";
import { fetchers } from "~/lib/fetchers";
import { cn } from "~/lib/utils";
import type { ProjectInvite } from "~/types";

type UserInviteListProps = {
  className?: string;
};

export const UserInviteList: FC<UserInviteListProps> = ({ className }) => {
  const { data: invites } = useQuery<ProjectInvite[]>({
    queryKey: ["user-invites"],
    queryFn: () => fetchers.getUserInvites(),
  });

  return (
    <div className={cn(className, "flex flex-col")}>
      <AnimatePresence initial={false}>
        {invites?.map((invite) => {
          return <UserInviteCard key={invite.id} {...invite} />;
        })}
      </AnimatePresence>
    </div>
  );
};
