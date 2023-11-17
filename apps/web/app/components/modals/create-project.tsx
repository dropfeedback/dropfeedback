import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { fetchers } from "~/lib/fetchers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { type ProjectVariables, type ProjectResponse } from "~/types";
import { type ApiError } from "~/lib/axios";

export function CreateProject() {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const form = useForm<ProjectVariables>({
    defaultValues: {
      name: "",
    },
  });

  const close = () => {
    setSearchParams((prev) => {
      prev.delete("modal");
      return prev;
    });
  };

  const { mutate, isPending } = useMutation<
    ProjectResponse,
    ApiError,
    ProjectVariables
  >({
    mutationFn: fetchers.createProject,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      close();
      navigate(`/dashboard/${data.id}`);
    },
  });

  const onSubmit = (values: ProjectVariables) => {
    mutate(values);
  };

  return (
    <Dialog
      modal={true}
      open
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Add a new project to collect and manage feedbacks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
                      required
                      minLength={3}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  close();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
