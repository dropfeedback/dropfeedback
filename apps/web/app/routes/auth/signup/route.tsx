import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import GoogleOAuthButton from "~/components/google-oauth-button";
import { Separator } from "~/components/ui/separator";

export default function Signup() {
  return (
    <div className="space-y-10">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Sign up to DropFeedback
      </h1>
      <div className="m-auto flex w-min flex-col items-center">
        <GoogleOAuthButton />
        <Separator className="my-6" />
        <Link to="/signup/email" className="text-base text-link">
          Continue with Email →
        </Link>
      </div>
      <p className="text-sm font-light text-muted-foreground">
        By joining, you agree to our{" "}
        <Link to="#" className="font-semibold text-primary hover:underline">
          Terms of Service
          <ExternalLinkIcon className="ml-0.5 inline-block h-4 w-4" />
        </Link>{" "}
        and{" "}
        <Link to="#" className="font-semibold text-primary hover:underline">
          Privacy Policy
          <ExternalLinkIcon className="ml-0.5 inline-block h-4 w-4" />
        </Link>
      </p>
    </div>
  );
}
