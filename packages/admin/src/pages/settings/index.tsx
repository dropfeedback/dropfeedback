import { useEffect } from "react";
import * as reactHookForm from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoadingIndicator } from "@/components/loading-indicator";
import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/data-hooks";
import { fetchers } from "@/lib/fetchers";
import { type ApiError } from "@/lib/axios";
import { type MeResponse } from "@/types";

type FormVariables = {
  fullName: string;
};

export const PageSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const user = useMe();

  const form = reactHookForm.useForm<FormVariables>({
    defaultValues: {
      fullName: user.data?.fullName ?? "",
    },
  });

  useEffect(() => {
    if (user.data) {
      form.reset({ fullName: user.data.fullName });
    }
  }, [user.data, form]);

  const updateMutation = useMutation<
    MeResponse,
    ApiError,
    Pick<MeResponse, "fullName">
  >({
    mutationFn: fetchers.updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      form.reset({ fullName: data.fullName });
      toast({
        title: "Success!",
        description: "Your account settings have been updated.",
      });
    },
  });

  const onSubmit = (variables: FormVariables) => {
    updateMutation.mutate({ fullName: variables.fullName.trim() });
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    This is how your name will appear in the app.
                  </FormDescription>
                  <div className="w-[300px]">
                    <FormControl>
                      <Input {...field} autoComplete="false" />
                    </FormControl>
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
};
