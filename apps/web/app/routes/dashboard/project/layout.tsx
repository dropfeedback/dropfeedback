import { Outlet } from "@remix-run/react";
import { Header } from "./header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
