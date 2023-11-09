import { Outlet } from "@remix-run/react";
import { DashboardHeader } from "~/components/dashboard-header";

export default function Layout() {
  return (
    <>
      <DashboardHeader />
      <div className="min-h-[calc(100vh-4rem)] bg-accent dark:bg-background">
        <Outlet />
      </div>
    </>
  );
}
