import { Outlet } from "@remix-run/react";
import { ProjectHeader } from "~/components/headers/project-header";

export default function Layout() {
  return (
    <div>
      <ProjectHeader />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
