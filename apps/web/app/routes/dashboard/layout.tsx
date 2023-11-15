import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DashboardHeader } from "~/components/dashboard-header";
import { axiosInstance } from "~/lib/axios";

type Response = { id: string; email: string };

const fetcher = async (cookie: string) => {
  const { data } = await axiosInstance.get<Response>("/auth/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const { pathname } = new URL(request.url);
  const redirectTo =
    pathname === "/" ? "/login" : `/login?to=${encodeURIComponent(pathname)}`;

  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    throw redirect(redirectTo);
  }

  try {
    await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: () => fetcher(cookie),
    });

    return json({ dehydratedState: dehydrate(queryClient) });
  } catch (error) {
    throw redirect(redirectTo);
  }
}

function Layout() {
  return (
    <>
      <DashboardHeader />
      <div className="min-h-[calc(100vh-4rem)] bg-accent dark:bg-background">
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
