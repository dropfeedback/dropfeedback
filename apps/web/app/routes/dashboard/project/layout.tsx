import { Outlet } from "@remix-run/react";
import { ProjectHeader } from "~/components/project-header";

export default function Layout() {
  return (
    <div>
      <ProjectHeader />
      <div className="container py-6">
        <Outlet />
      </div>
    </div>
  );
}
