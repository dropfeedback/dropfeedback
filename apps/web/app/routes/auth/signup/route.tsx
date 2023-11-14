import { Link } from "@remix-run/react";
import GoogleOAuthButton from "~/components/google-oauth-button";
import { Separator } from "~/components/ui/separator";

export default function Signup() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold tracking-tight">
        Sign up for DropFeedback
      </h1>
      <br />
      <GoogleOAuthButton />
      <Separator className="my-6" />
      <div className="text-center">
        <Link to="/signup/email" className="text-base text-link">
          Continue with Email →
        </Link>
      </div>
    </div>
  );
}
