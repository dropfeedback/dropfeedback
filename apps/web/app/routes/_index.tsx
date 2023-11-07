import type { MetaFunction } from "@remix-run/node";
import { ThemeSwitcher } from "~/components/theme-switcher";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center">
      <ThemeSwitcher />
    </div>
  );
}
