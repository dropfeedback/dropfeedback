import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { fetchers } from "~/lib/fetchers";
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

const useLocalLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useMutation<Response, AxiosError, Variables>({
    mutationFn: fetchers.signin,
    onSuccess: () => {
      const nextURL = searchParams.get("next");

      navigate(nextURL ?? "/dashboard");
    },
  });
};

type FormValues = {
  email: string;
  password: string;
};

export default function LoginWithEmail() {
  const { search } = useLocation();
  const { mutate } = useLocalLogin();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Log in to DropFeedback
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-auto max-w-[325px] space-y-4"
        >
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
                    required
                    type="email"
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
                    required
                    minLength={4}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Log In
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <Link
          to={{
            pathname: "/login",
            search,
          }}
          className="text-base text-link"
        >
          ← Other Login Options
        </Link>
      </div>
    </div>
  );
}
