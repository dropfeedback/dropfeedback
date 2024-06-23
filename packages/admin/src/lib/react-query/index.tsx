import { isAxiosError } from "axios";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryClientProvider>
);

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      let title = "Uh oh! Something went wrong.";
      let description = "There was a problem with your mutation.";

      if (isAxiosError(error)) {
        const response = error?.response;
        title = response?.data?.error || title;
        description = response?.data?.message || description;
      }

      return toast({
        title,
        description,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => window.location.reload()}
          >
            Try again
          </ToastAction>
        ),
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options?.meta?.errorToast === false) return;

      let title = "Uh oh! Something went wrong.";
      let description = "There was a problem with your mutation.";

      if (isAxiosError(error)) {
        const response = error?.response;
        title = response?.data?.error || title;
        description = response?.data?.message || description;
      }

      toast({
        title,
        description,
      });
    },
  }),
});
