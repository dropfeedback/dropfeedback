import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { useAuthForm } from "@/components/auth-form/useAuthForm";
import { AuthFormType } from "./types";

type Props = {
  type: AuthFormType;
};

export const AuthForm = (props: Props) => {
  const { onSubmit, ...form } = useAuthForm({ type: props.type });

  const typeText = props.type === "signin" ? "Sign In" : "Sign Up";

  return (
    <>
      <div className={cn("bg-zinc-900", "p-4", "rounded-sm")}>
        <h2 className={cn("text-2xl font-semibold")}>
          <span className="capitalize">{typeText}</span> to Feedbacky
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
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
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
