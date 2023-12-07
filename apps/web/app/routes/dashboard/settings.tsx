import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
import { useMe } from "~/data-hooks";
import { fetchers } from "~/lib/fetchers";
import { type ApiError } from "~/lib/axios";
import { type MeResponse } from "~/types";

type FormVariables = {
  name: string;
};

export default function Settings() {
  const queryClient = useQueryClient();

  const form = useForm<FormVariables>({
    defaultValues: {
      name: "",
    },
  });

  const user = useMe();

  useEffect(() => {
    if (user.data) {
      form.reset({ name: user.data.fullName });
    }
  }, [user.data, form]);

  const updateMutation = useMutation<
    MeResponse,
    ApiError,
    Pick<MeResponse, "fullName">
  >({
    //TODO: Add mutationFn
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      form.reset({ name: data.fullName });
    },
  });

  const onSubmit = (variables: FormVariables) => {
    updateMutation.mutate({ fullName: variables.name.trim() });
  };

  return (
    <>
      <div className="container py-10 pb-4">
        <h2 className="text-3xl tracking-wide">Account Settings</h2>
      </div>
      <Separator className="my-6" />
      <div className="container mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    This is how your name will appear in the app.
                  </FormDescription>
                  <div className="w-[300px]">
                    {user.isPending ? (
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
      </div>
    </>
  );
}
