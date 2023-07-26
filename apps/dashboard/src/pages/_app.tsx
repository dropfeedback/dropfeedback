import { FC, PropsWithChildren, useState } from "react";
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

type AppPropsWithPage = AppProps & {
  Component: {
    protected?: boolean;
  };
};

export default function App({ Component, pageProps }: AppPropsWithPage) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
