import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "@remix-run/react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { type InviteMemberVariables } from "~/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { LoadingIndicator } from "./loading-indicator";
import { fetchers } from "~/lib/fetchers";
import { useMe } from "~/data-hooks";
import { ROLES } from "~/lib/constants/roles";
import { type ApiError } from "~/lib/axios";

export function TeamInviteModal() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<InviteMemberVariables>({
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const { data: user } = useMe();

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
        queryKey: ["team", projectId],
      });
    },
    onError: (error) => {
      let description;

      if (typeof error.response?.data.message === "string") {
        description = error.response?.data.message;
      }

      if (Array.isArray(error.response?.data.message)) {
        description = (
          <div className="flex flex-col">
            {error.response?.data.message.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        );
      }

      toast({
        title: "Error",
        description,
      });
    },
  });

  const onSubmit = (values: InviteMemberVariables) => {
    inviteUser.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite your team members</DialogTitle>
          <DialogDescription>
            They will receive an email invitation to join the project.
          </DialogDescription>
        </DialogHeader>
        <Separator />
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
                <FormItem className="space-y-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="gap-4"
                    >
                      {ROLES.map((role) => (
                        <FormItem
                          key={role.value}
                          className="flex space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              id={role.value}
                              value={role.value}
                            />
                          </FormControl>
                          <FormLabel
                            className="font-normal"
                            htmlFor={role.value}
                          >
                            <div className="mb-1 leading-none">{role.name}</div>
                            <p className="text-xs text-muted-foreground">
                              {role.description}
                            </p>
                          </FormLabel>
                        </FormItem>
                      ))}
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
              <Button type="submit" disabled={inviteUser.isPending}>
                {inviteUser.isPending && <LoadingIndicator className="mr-2" />}
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
