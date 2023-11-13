import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "./useGoogleLogin";
import { Separator } from "~/components/ui/separator";
import { Link } from "@remix-run/react";

export default function Login() {
  const { mutate } = useGoogleLogin();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to needback
        </h1>
        <br />
        <GoogleLogin
          text="continue_with"
          onSuccess={(credentialResponse) => {
            const credential = credentialResponse.credential;
            if (!credential) return;

            mutate({
              idToken: credential,
            });
          }}
        />
        <Separator className="my-6" />
        <div className="text-center">
          <Link to="/login/email" className="text-link text-base">
            Continue with Email →
          </Link>
        </div>
      </div>
    </div>
  );
}
