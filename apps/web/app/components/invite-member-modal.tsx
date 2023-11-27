import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "@remix-run/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { type ProjectMemberRole, type InviteMemberVariables } from "~/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  CaretSortIcon,
  CheckIcon,
  ExternalLinkIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "~/lib/utils";
import { Command, CommandGroup, CommandItem } from "./ui/command";

import { type ApiError } from "~/lib/axios";
import { fetchers } from "~/lib/fetchers";

const roles = [
  { label: "Member", value: "member" },
  { label: "Manager", value: "manager" },
  { label: "Owner", value: "owner" },
];

export default function InviteMemberModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<InviteMemberVariables>({
    defaultValues: {
      email: "",
      role: undefined,
    },
  });

  const inviteUser = useMutation<
    InviteMemberVariables,
    ApiError,
    InviteMemberVariables
  >({
    mutationFn: (variables) => fetchers.inviteMember(projectId, variables),
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["members", { projectId }],
      });
    },
  });

  const onSubmit = (values: InviteMemberVariables) => {
    inviteUser.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite your team members</DialogTitle>
          <DialogDescription>
            They will receive an email invitation to join the project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="someone@example.com"
                      required
                      type="email"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Role</FormLabel>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? roles.find((role) => role.value === field.value)
                                ?.label
                            : "Select role"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandGroup>
                          {roles.map((role) => (
                            <CommandItem
                              value={role.label}
                              key={role.value}
                              onSelect={() => {
                                form.setValue(
                                  "role",
                                  role.value as keyof typeof ProjectMemberRole,
                                );
                                setPopoverOpen(false);
                              }}
                            >
                              {role.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  role.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Learn more about{" "}
                    <Link
                      to="#"
                      className="inline-flex items-center text-link underline-offset-2 hover:underline"
                    >
                      Roles
                      <ExternalLinkIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </FormDescription>
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
              <Button type="submit" disabled={inviteUser.isPending}>
                {inviteUser.isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
