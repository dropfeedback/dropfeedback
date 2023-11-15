import { Link, useLocation } from "@remix-run/react";
import GoogleOAuthButton from "~/components/google-oauth-button";
import { Separator } from "~/components/ui/separator";

export default function Login() {
  const { search } = useLocation();

  return (
    <div className="space-y-10">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Log in to DropFeedback
      </h1>
      <div className="m-auto flex w-min flex-col items-center">
        <GoogleOAuthButton />
        <Separator className="my-6" />
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
  );
}
