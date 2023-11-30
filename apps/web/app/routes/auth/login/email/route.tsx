import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchers } from "~/lib/fetchers";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { LoadingIndicator } from "~/components/loading-indicator";
import { type ApiError } from "~/lib/axios";
import { Alert, AlertDescription } from "~/components/ui/alert";

type Response = null;
type Variables = { email: string; password: string };

const useLocalLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useMutation<Response, ApiError, Variables>({
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
  const { mutate, isPending, error, isError } = useLocalLogin();

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

      <div className="m-auto max-w-[325px] space-y-6">
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              variant="destructive"
              className="w- bg-destructive-foreground"
            >
              <AlertDescription>
                {error?.response?.data?.message ?? error?.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

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
                      required
                      type="email"
                    />
                  </FormControl>
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
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending && <LoadingIndicator className="mr-2" />}
              Log In
            </Button>
          </form>
        </Form>
      </div>
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
