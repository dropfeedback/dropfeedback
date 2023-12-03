import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DashboardHeader } from "~/components/dashboard-header";
import { fetchers } from "~/lib/fetchers";

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const { pathname } = new URL(request.url);
  const redirectNext =
    pathname === "/dashboard"
      ? "/login"
      : `/login?next=${encodeURIComponent(pathname)}`;

  const cookie = request.headers.get("Cookie");

  if (!cookie) {
    throw redirect(redirectNext);
  }

  try {
    await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: () => fetchers.me(cookie),
    });

    return json({ dehydratedState: dehydrate(queryClient) });
  } catch (error) {
    return redirect(redirectNext);
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
