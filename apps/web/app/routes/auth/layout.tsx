import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { AuthHeader } from "~/components/auth-header";
import { axiosInstance } from "~/lib/axios";

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

  const cookie = request.headers.get("Cookie");
  if (cookie) {
    try {
      await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: () => fetcher(cookie),
      });

      return redirect("/dashboard");
    } catch (error) {
      return;
    }
  }
}

function Layout() {
  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
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
