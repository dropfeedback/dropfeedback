import { Outlet } from "@remix-run/react";
import { AuthHeader } from "~/components/auth-header";

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
