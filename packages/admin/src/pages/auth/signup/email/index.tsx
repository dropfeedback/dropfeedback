import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchers } from "@/lib/fetchers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingIndicator } from "@/components/loading-indicator";
import { type ApiError } from "@/lib/axios";
import { SignupLocalResponse } from "@/types";

type FormValues = {
  email: string;
  password: string;
  fullName: string;
};

export const PageSignupWithEmail = () => {
  const navigate = useNavigate();

  const signUp = useMutation<SignupLocalResponse, ApiError, FormValues>({
    mutationFn: fetchers.signup,
    onSuccess: () => {
      navigate("/projects");
    },
    meta: {
      errorToast: false,
    },
  });

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    signUp.mutate(values);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
        Sign up for DropFeedback
      </h1>
      <div className="m-auto max-w-[325px] space-y-6">
        {signUp.isError && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              variant="destructive"
              className="border-red bg-red-foreground text-red"
            >
              <AlertDescription>
                {signUp.error?.response?.data?.message ?? signUp.error?.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-auto max-w-[325px] space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                      className="h-12"
                      required
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="h-12"
                      minLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={signUp.isPending}
            >
              {signUp.isPending && <LoadingIndicator className="mr-2" />}
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center">
        <Link to="/signup" className="text-base text-link">
          ← Other Sign Up Options
        </Link>
      </div>
      <p className="text-center font-light text-muted-foreground">
        By joining, you agree to our{" "}
        <Link to="#" className="font-semibold text-primary hover:underline">
          Terms of Service
          <ExternalLinkIcon className="ml-0.5 inline-block h-4 w-4" />
        </Link>{" "}
        and{" "}
        <Link to="#" className="font-semibold text-primary hover:underline">
          Privacy Policy
          <ExternalLinkIcon className="ml-0.5 inline-block h-4 w-4" />
        </Link>
      </p>
    </div>
  );
};
