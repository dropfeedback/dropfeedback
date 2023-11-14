import { Link } from "@remix-run/react";
import GoogleOAuthButton from "~/components/google-oauth-button";
import { Separator } from "~/components/ui/separator";

export default function Login() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold tracking-tight">
        Log in to needback
      </h1>
      <br />
      <GoogleOAuthButton />
      <Separator className="my-6" />
      <div className="text-center">
        <Link to="/login/email" className="text-base text-link">
          Continue with Email →
        </Link>
      </div>
    </div>
  );
}
