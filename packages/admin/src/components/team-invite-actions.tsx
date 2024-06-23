import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { fetchers } from "@/lib/fetchers";
import { type ApiError } from "@/lib/axios";
import { useMe } from "@/data-hooks";
import { type ProjectMemberInvite, ProjectMemberRole } from "@/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LoadingIndicator } from "./loading-indicator";

type CancelInviteVariables = {
  inviteId: string;
};

export function TeamInviteActions({ invite }: { invite: ProjectMemberInvite }) {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [open, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const cancelInvite = useMutation<undefined, ApiError, CancelInviteVariables>({
    mutationFn: ({ inviteId }) => fetchers.cancelInvite(projectId, inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", projectId] });
      setIsOpen(false);
    },
  });

  const { data: user } = useMe();
  const userRoleOnProject = user?.projects?.find(
    (project) => project.id === projectId,
  )?.role;

  const isMember = userRoleOnProject === ProjectMemberRole.member;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Actions"
            disabled={isMember}
          >
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setIsOpen(true)}
            className="text-red"
          >
            Cancel invite
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel invite for {invite.email}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This invite will be canceled and the user will not be able to join
              the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={cancelInvite.isPending}
              onClick={() => {
                cancelInvite.mutate({ inviteId: invite.id });
              }}
            >
              {cancelInvite.isPending && <LoadingIndicator className="mr-2" />}
              Cancel Invite
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
