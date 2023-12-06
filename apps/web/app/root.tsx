import { useState } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { ModalRoot } from "~/components/global-modals/modal-root";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const { toast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 1000,
          },
        },
        queryCache: new QueryCache({
          onError: () =>
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: (
                <ToastAction
                  altText="Try again"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </ToastAction>
              ),
            }),
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            if (mutation.options?.meta?.errorToast === false) return;
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your mutation.",
            });
          },
        }),
      }),
  );

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId="108576727290-r2vpjvnub36682vn3vig0rq1jvj9to2n.apps.googleusercontent.com">
              <main className="relative min-h-screen">
                <Outlet />
                <ModalRoot />
              </main>
            </GoogleOAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
