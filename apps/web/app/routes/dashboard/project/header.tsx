import { Link, useLocation, useParams } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const ROUTES = [
  {
    key: "overview",
    title: "Overview",
    path: "/dashboard/:projectId",
  },
  {
    key: "feedbacks",
    title: "Feedbacks",
    path: "/dashboard/:projectId/feedbacks",
  },
  {
    key: "team",
    title: "Team",
    path: "/dashboard/:projectId/team",
  },
  {
    key: "integrations",
    title: "Integrations",
    path: "/dashboard/:projectId/integrations",
  },
];

export function Header() {
  const params = useParams<{ projectId: string }>();
  const location = useLocation();

  const activeRoute =
    ROUTES.find((route) => {
      return location.pathname.includes(route.key);
    }) ?? ROUTES[0];

  return (
    <div className="sticky top-0 -ml-3 -mt-3 flex h-auto rounded-none border-b border-muted bg-background px-6 py-2 text-muted-foreground shadow-sm">
      {ROUTES.map((route) => (
        <Button
          key={route.title}
          variant="ghost"
          size="default"
          asChild
          className={cn("relative font-normal", {
            "active-tab text-primary": activeRoute.key === route.key,
          })}
        >
          <Link to={route.path.replace(":projectId", params.projectId!)}>
            {route.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
