import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link, useLocation, useParams } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  {
    key: "settings",
    title: "Settings",
    path: "/dashboard/:projectId/settings",
  },
];

export function ProjectHeader() {
  const [isStickyActive, setIsStickyActive] = useState(false);
  const params = useParams<{ projectId: string }>();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setIsStickyActive(true);
      } else {
        setIsStickyActive(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeRoute =
    ROUTES.find((route) => {
      return location.pathname.includes(route.key);
    }) ?? ROUTES[0];

  return (
    <div className="sticky top-0 -mt-3 flex h-auto items-center rounded-none border-b bg-background px-6 py-2 text-muted-foreground shadow-border z-50">
      {isStickyActive && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChatBubbleIcon className="h-5 w-5" />
        </motion.div>
      )}
      <motion.div
        layout
        layoutDependency={isStickyActive}
        className={cn("relative ml-2", { "-ml-3": !isStickyActive })}
      >
        {ROUTES.map((route) => (
          <Button
            key={route.key}
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
      </motion.div>
    </div>
  );
}
