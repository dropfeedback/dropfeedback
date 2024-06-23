import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchers } from "@/lib/fetchers";
import { type ProjectMutationResponse, type ProjectVariables } from "@/types";
import { type ApiError } from "@/lib/axios";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { LoadingIndicator } from "../loading-indicator";

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
    ProjectMutationResponse,
    ApiError,
    ProjectVariables
  >({
    mutationFn: fetchers.createProject,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      close();
      navigate(`/projects/${data.id}`);
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
            Add a new project to collect and manage feedback.
          </DialogDescription>
        </DialogHeader>
        <Separator />
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
                {isPending && <LoadingIndicator className="mr-2" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
