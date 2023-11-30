import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@remix-run/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { fetchers } from "~/lib/fetchers";
import { type ProjectInvite } from "~/types";
import { type ApiError } from "~/lib/axios";

type CancelInviteVariables = {
  inviteId: string;
};

export function TeamInviteActions({
  invite,
}: {
  invite: Omit<ProjectInvite, "projectId" | "projectName">;
}) {
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" title="Actions">
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
