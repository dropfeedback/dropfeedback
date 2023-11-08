import { Outlet } from "@remix-run/react";
import { Header } from "./header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] bg-accent p-6">
        <Outlet />
      </div>
    </>
  );
}
