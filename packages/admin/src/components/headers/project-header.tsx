import { useEffect, useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROUTES = [
  {
    key: "feedback",
    title: "Feedback",
    path: "/projects/:projectId",
  },
  {
    key: "team",
    title: "Team",
    path: "/projects/:projectId/team",
  },
  {
    key: "settings",
    title: "Settings",
    path: "/projects/:projectId/settings",
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
    <div className="sticky top-0 z-50 -mt-3 flex h-auto items-center overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-none border-b bg-background px-4 py-2 text-muted-foreground md:px-6">
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
            className={cn("tab-button relative font-medium", {
              "active-tab-button font-semibold text-primary":
                activeRoute.key === route.key,
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
