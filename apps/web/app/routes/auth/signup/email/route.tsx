import { Link } from "@remix-run/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMutation } from "react-query-kit";
import { type AxiosError } from "axios";
import { axiosInstance } from "~/lib/axios";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type Response = null;
type Variables = { email: string; password: string };

const useLocalSignup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { data } = await axiosInstance.post<Response>(
      "/auth/local/signup",
      variables,
    );

    return data;
  },
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginWithEmail() {
  const { mutate } = useLocalSignup();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">
        Sign up for DropFeedback
      </h1>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email address"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Sign Up
          </Button>
        </form>
      </Form>
      <br />
      <div className="mt-8 text-center">
        <Link to="/signup" className="text-base text-link">
          ← Other Sign Up Options
        </Link>
      </div>
    </div>
  );
}
