import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { useCopyToClipboard } from "~/lib/hooks/useCopyToClipboard";
import { type Project } from "~/types";

export default function Settings() {
  const form = useForm<Project>({
    defaultValues: {
      id: "c3872099-78b3-41a1-8e57-6661d8b5eff4",
      name: "Lorem Ipsum",
    },
  });

  const [copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const onSubmit = (variables: Project) => {
    console.log("submit form", variables);
  };

  const copyProjectId = () => {
    copy(form.getValues("id"));
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="h-full space-y-6 bg-background">
      <div className="container p-10 pb-4">
        <h2 className="text-3xl tracking-wide">Project Settings</h2>
      </div>
      <Separator className="my-6" />
      <div className="container">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      type="button"
                      onClick={copyProjectId}
                    >
                      {isCopied ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckIcon />
                        </motion.div>
                      ) : (
                        <CopyIcon />
                      )}
                    </Button>
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
                  <FormControl>
                    <Input className="max-w-[300px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm">
              Save
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Delete Project</h3>
          <p className="text-[0.8rem] text-muted-foreground">
            The project will be permanently deleted, including its feedbacks.
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
                  your project and all its feedbacks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
