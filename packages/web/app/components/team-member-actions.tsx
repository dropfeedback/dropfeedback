import { useState } from "react";
import { useParams } from "@remix-run/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { LoadingIndicator } from "./loading-indicator";
import { fetchers } from "~/lib/fetchers";
import { ROLES } from "~/lib/constants/roles";
import { useMe } from "~/data-hooks";
import { type ApiError } from "~/lib/axios";
import { cn } from "~/lib/utils";
import { ProjectMemberRole, type ProjectMember } from "~/types";

type DeleteMemberVariables = {
  memberId: string;
};

export function TeamMemberActions({ member }: { member: ProjectMember }) {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const removeMember = useMutation<undefined, ApiError, DeleteMemberVariables>({
    mutationFn: ({ memberId }) => fetchers.deleteMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", projectId] });
      setShowDeleteDialog(false);
    },
  });

  const form = useForm<{ role: ProjectMemberRole }>({
    defaultValues: {
      role: member.role,
    },
  });

  const onSubmit = (values: { role: ProjectMemberRole }) => {
    //TODO: Add mutation to update role
    console.log("values", values);
  };

  const { data: user } = useMe();
  const userRoleOnProject =
    user?.projects.find((project) => project.id === projectId)?.role ??
    "member";

  const isMember = userRoleOnProject === ProjectMemberRole.member;
  const isManager = userRoleOnProject === ProjectMemberRole.manager;

  const isCurrentUser = user?.id === member.id;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Actions"
            disabled={
              isMember ||
              (isManager && member.role === ProjectMemberRole.owner) ||
              isCurrentUser
            }
          >
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Change role
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red"
          >
            Remove from project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Change {member.fullName}&apos;s role on this project
            </DialogTitle>
            <DialogDescription>
              This will change the permissions of this person on this project.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="gap-4"
                      >
                        {ROLES.map((role) => {
                          const disabled =
                            role.value === ProjectMemberRole.owner && isManager;

                          return (
                            <FormItem
                              key={role.value}
                              className="flex space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  id={role.value}
                                  disabled={disabled}
                                  value={role.value}
                                />
                              </FormControl>
                              <FormLabel
                                className={cn("font-normal", {
                                  "text-muted-foreground": disabled,
                                  "opacity-70": disabled,
                                })}
                                htmlFor={role.value}
                              >
                                <div className="mb-1 leading-none">
                                  {role.name}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {role.description}
                                </p>
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Change Role</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {member.fullName} from this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This person will no longer have
              access to this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={removeMember.isPending}
              onClick={() => {
                removeMember.mutate({ memberId: member.id });
              }}
            >
              {removeMember.isPending && <LoadingIndicator className="mr-2" />}
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
