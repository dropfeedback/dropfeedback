import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AuthHeader } from "~/components/auth-header";
import { fetchers } from "~/lib/fetchers";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");

  try {
    await fetchers.me(cookie ?? "");

    return redirect("/dashboard");
  } catch (error) {
    return null;
  }
}

export default function Layout() {
  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}
