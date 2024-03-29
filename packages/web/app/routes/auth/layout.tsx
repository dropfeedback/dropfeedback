import {
  type LoaderFunctionArgs,
  redirect,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { AuthHeader } from "~/components/headers/auth-header";
import { API_URL } from "~/lib/axios";
import { defaultMeta } from "~/lib/default-meta";
import type { MeResponse } from "~/types";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const cookieHeader = request.headers.get("Cookie") || "";
    const accessToken = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];

    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const user: MeResponse = await response.json();
    if (!user?.isEmailVerified) {
      redirect("/dashboard/email-verification");
    }

    return redirect("/dashboard");
  } catch (error) {
    return null;
  }
}

export default function Layout() {
  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
        <div className="container mx-4 w-full rounded-lg border p-4 sm:w-fit sm:p-16  ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export const meta: MetaFunction = () => {
  return [...defaultMeta];
};
