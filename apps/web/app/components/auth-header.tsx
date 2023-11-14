import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export function AuthHeader() {
  const location = useLocation();

  const [isLoginPage, setIsLoginPage] = useState(
    location.pathname.startsWith("/login"),
  );

  useEffect(() => {
    setIsLoginPage(location.pathname.startsWith("/login"));
  }, [location.pathname]);

  return (
    <nav className="flex h-16 items-center border-b px-6 shadow-border">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <ChatBubbleIcon className="h-5 w-5" />
              <span className="text-lg font-bold tracking-tight">
                DropFeedback
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button className="font-normal text-muted-foreground transition-colors hover:text-primary">
          Feedback
        </button>
        <Button asChild variant="outline">
          {isLoginPage ? (
            <Link to="/signup">Sign Up</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </Button>
      </div>
    </nav>
  );
}
