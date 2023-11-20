import { Outlet } from "@remix-run/react";
import { ProjectHeader } from "~/components/project-header";

export default function Layout() {
  return (
    <div>
      <ProjectHeader />
      <div className="min-h-[calc(100vh-6.625rem)]">
        <Outlet />
      </div>
    </div>
  );
}
