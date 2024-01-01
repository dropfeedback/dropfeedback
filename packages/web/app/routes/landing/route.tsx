import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { ThemeSwitcher } from "~/components/headers/theme-switcher";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Welcome to Needback!</h1>
      <br />
      <div className="flex items-center gap-4">
        <p>This is a theme switcher</p>
        <ThemeSwitcher />
      </div>
      <br />
      <div className="flex flex-col gap-2">
        <Link className="text-blue-600" to="/dashboard">
          {"->"} Dashboard
        </Link>
        <Link className="text-blue-600" to="/docs">
          {"->"} Docs
        </Link>
      </div>
    </div>
  );
}
