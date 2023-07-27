import {
  Children,
  FC,
  PropsWithChildren,
  isValidElement,
  useEffect,
  useState,
} from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "@/context/auth-context/auth-context";
import "@/styles/globals.css";
import { Path, useTypeSafeRouter } from "@/hooks/useTypeSafeRouter";
import { PageLoading } from "@/components/page-loading";

type AppPropsWithPage = AppProps & {
  Component: {
    auth?: boolean;
    redirectIfAuthenticated?: Path;
  };
};

const Pages = ({ children }: any) => {
  const router = useTypeSafeRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    Children.forEach(children, (element) => {
      if (!isValidElement(element)) return;

      const { auth = false, redirectIfAuthenticated = undefined } =
        element?.type as {
          auth?: boolean;
          redirectIfAuthenticated?: Path;
        };

      if (isLoading) return;

      if (!!redirectIfAuthenticated && isAuthenticated) {
        router.replace(redirectIfAuthenticated);
      }

      if (auth && !isAuthenticated) {
        router.replace("/signin");
      }
    });
  }, [children, isAuthenticated, isLoading, router]);

  if (isLoading) return <PageLoading />;

  return children;
};

export default function App({ Component, pageProps }: AppPropsWithPage) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <Pages>
            <Component {...pageProps} />
          </Pages>
          <Toaster position="top-right" />
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
