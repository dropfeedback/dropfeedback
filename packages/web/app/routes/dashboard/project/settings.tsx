import { useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { LoadingIndicator } from "~/components/loading-indicator";
import { CopyButton } from "~/components/copy-button";
import { fetchers } from "~/lib/fetchers";
import { type ApiError } from "~/lib/axios";
import { type Project } from "~/types";

export default function Settings() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<Project>({
    defaultValues: {
      id: projectId,
      name: "",
    },
  });

  const project = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: () => fetchers.getProject(projectId),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (project.data) {
      form.reset(project.data);
    }
  }, [project.data, form]);

  const updateMutation = useMutation<Project, ApiError, Pick<Project, "name">>({
    mutationFn: (variables) => fetchers.updateProject(projectId, variables),
    onSuccess: (data) => {
      //Update the project in the cache
      queryClient.setQueryData(["project", projectId], data);
      queryClient.setQueryData(["projects"], (projects: Project[]) => {
        if (!projects) return;

        const index = projects.findIndex((p) => p.id === projectId);

        if (index === -1) return projects;

        return [
          ...projects.slice(0, index),
          { ...projects[index], name: data.name },
          ...projects.slice(index + 1),
        ];
      });
      form.reset(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => fetchers.deleteProject(projectId),
    onSuccess: () => {
      //Remove the project from the cache
      queryClient.setQueryData(["projects"], (projects: Project[]) => {
        if (!projects) return;

        const index = projects.findIndex((p) => p.id === projectId);

        if (index === -1) return projects;

        return [...projects.slice(0, index), ...projects.slice(index + 1)];
      });
    },
  });

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      navigate("/dashboard");
    }
  }, [deleteMutation.isSuccess, navigate]);

  const onSubmit = (variables: Project) => {
    updateMutation.mutate({ name: variables.name.trim() });
  };

  return (
    <>
      <div className="container py-10 pb-4">
        <h2 className="text-3xl tracking-wide">Project Settings</h2>
      </div>
      <Separator className="my-6" />
      <div className="container mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormDescription>
                    Used when interacting with the widget.
                  </FormDescription>
                  <div className="relative max-w-[400px]">
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <CopyButton
                      className="absolute right-0 top-0"
                      value={projectId}
                    />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormDescription>
                    Used to identify your Project on the Dashboard.
                  </FormDescription>
                  <div className="w-[300px]">
                    {project.isPending ? (
                      <Skeleton className="h-9 w-full" />
                    ) : (
                      <FormControl>
                        <Input {...field} autoComplete="false" />
                      </FormControl>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <LoadingIndicator className="mr-2" />
              ) : null}
              Save
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Delete Project</h3>
          <p className="text-[0.8rem] text-muted-foreground">
            The project will be permanently deleted, including its feedback.
            This action is irreversible and can not be undone.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your project and all its feedback.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
