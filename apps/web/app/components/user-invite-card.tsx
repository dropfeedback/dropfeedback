import type { FC } from "react";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type { ProjectInvite } from "~/types";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";

type UserInviteCardProps = ProjectInvite;

export const UserInviteCard: FC<UserInviteCardProps> = ({
  projectName,
  projectId,
}) => {
  const queryClient = useQueryClient();

  const { mutate: acceptInvite } = useMutation({
    mutationFn: fetchers.acceptInvite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({ queryKey: ["user-invites"] }),
      ]);
    },
  });
  const { mutate: declineInvite } = useMutation({
    mutationFn: fetchers.rejectInvite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-invites"] }),
      ]);
    },
  });

  const handleAcceptInvite = () => {
    acceptInvite({ projectId });
  };

  const handleRejectInvite = () => {
    declineInvite({ projectId });
  };

  return (
    <Alert>
      <EnvelopeClosedIcon className="h-4 w-4" />
      <AlertTitle className="mb-0 leading-6">Project Invitation</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <p>
          You have been invited to join the{" "}
          <span className="font-semibold text-primary">"{projectName}"</span>.
        </p>
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="text-success hover:text-success"
            onClick={handleAcceptInvite}
          >
            <CheckCircledIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={handleRejectInvite}
          >
            <CrossCircledIcon className="h-6 w-6" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
