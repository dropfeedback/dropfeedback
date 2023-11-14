import { Link } from "@remix-run/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useLocalSignup } from "./useLocalSignup";

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
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-80 flex-col">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Sign up
            </Button>
          </form>
        </Form>
        <br />
        <div className="text-center">
          <Link to="/signup" className="text-base text-link">
            ← Other Sign Up Options
          </Link>
        </div>
      </div>
    </div>
  );
}
