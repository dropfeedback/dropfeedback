import { Link } from "@remix-run/react";
import GoogleOAuthButton from "~/components/google-oauth-button";
import { Separator } from "~/components/ui/separator";

export default function Login() {
  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">
        Log in to DropFeedback
      </h1>
      <div className="m-auto flex w-min flex-col items-center">
        <GoogleOAuthButton />
        <Separator className="my-6" />
        <Link to="/login/email" className="text-base text-link">
          Continue with Email →
        </Link>
      </div>
    </div>
  );
}
