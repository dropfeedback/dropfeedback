import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchers } from "~/lib/fetchers";
import { Alert, AlertDescription } from "./ui/alert";
import { type ApiError } from "~/lib/axios";

type Response = { token: string };
type Variables = { idToken: string };

const useGoogleLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useMutation<Response, ApiError, Variables>({
    mutationKey: ["googleLogin"],
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      const nextURL = searchParams.get("next");

      navigate(nextURL ?? "/dashboard");
    },
  });
};

export default function GoogleOAuthButton() {
  const { mutate, error, isError } = useGoogleLogin();

  return (
    <div className="space-y-6">
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive" className="bg-destructive-foreground">
            <AlertDescription>
              {error?.response?.data?.message ?? error?.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      <GoogleLogin
        text="continue_with"
        size="large"
        width={325}
        onSuccess={(credentialResponse) => {
          const credential = credentialResponse.credential;
          if (!credential) return;

          mutate({
            idToken: credential,
          });
        }}
      />
    </div>
  );
}
