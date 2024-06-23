import { Link, useLocation } from "react-router-dom";
import { GoogleOAuthButton } from "@/components/google-oauth-button";
import { Separator } from "@/components/ui/separator";

export const PageLogin = () => {
  const { search } = useLocation();

  return (
    <div className="space-y-10">
      <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
        Log in to DropFeedback
      </h1>
      <div className="m-auto max-w-[325px]">
        <GoogleOAuthButton />
        <Separator className="my-6" />
        <div className="text-center">
          <Link
            to={{
              pathname: "/login/email",
              search,
            }}
            className="text-base text-link"
          >
            Continue with Email →
          </Link>
        </div>
      </div>
    </div>
  );
};
