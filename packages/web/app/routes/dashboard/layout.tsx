import { json, redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { DashboardHeader } from "~/components/headers/dashboard-header";
import { API_URL } from "~/lib/axios";

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const { pathname } = new URL(request.url);

  const shouldAddNext = ![
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/email-verification",
  ].includes(pathname);
  // when we redirected to any page, we should add the next query param. so that we can redirect back to the page after login
  const nextUrl = encodeURIComponent(pathname);

  const cookieHeader = request.headers.get("Cookie") || "";
  const accessToken = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("accessToken="))
    ?.split("=")[1];

  if (!accessToken) {
    const redirectNext = shouldAddNext ? `/login?next=${nextUrl}` : "/login";
    throw redirect(redirectNext);
  }

  try {
    await queryClient.fetchQuery({
      // TODO: rehydrate not working, because of that we are using different queryKey
      queryKey: ["me-server"],
      queryFn: () =>
        fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      retry: false,
    });

    return json({ dehydratedState: dehydrate(queryClient) });
  } catch (error: any) {
    const response = error;
    const data = await response.json();

    const status = response?.status;
    const message = data?.message;

    let redirectUrl = "/login";

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
