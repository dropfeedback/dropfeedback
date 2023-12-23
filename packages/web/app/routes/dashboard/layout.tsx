import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DashboardHeader } from "~/components/headers/dashboard-header";
import type { ApiError } from "~/lib/axios";
import { fetchers } from "~/lib/fetchers";

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const { pathname } = new URL(request.url);

  const shouldAddNext = ![
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/email-verification",
  ].includes(pathname);

  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    const redirectNext = shouldAddNext
      ? `/login?next=${encodeURIComponent(pathname)}`
      : "/login";
    throw redirect(redirectNext);
  }

  try {
    await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: () => fetchers.me(cookie),
    });

    return json({ dehydratedState: dehydrate(queryClient) });
  } catch (error: any) {
    const response = (error as ApiError).response;
    const status = response?.status;
    const message = response?.data?.message;

    let redirectUrl = "/login";
    const nextUrl = encodeURIComponent(pathname);

    // API returns 403 and message is "Email is not verified". redirect to /email-verification
    if (status === 403 && message === "Email is not verified") {
      redirectUrl = "/dashboard/email-verification";
    }

    // if we are already on the redirectUrl, return the json
    if (pathname === redirectUrl) {
      return json({ dehydratedState: dehydrate(queryClient) });
    }

    return redirect(
      shouldAddNext ? `${redirectUrl}?next=${nextUrl}` : redirectUrl,
    );
  }
}

function Layout() {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        <Outlet />
      </div>
    </>
  );
}

export default function LayoutRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Layout />
    </HydrationBoundary>
  );
}
