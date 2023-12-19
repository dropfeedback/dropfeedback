import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchers } from "~/lib/fetchers";
import { Alert, AlertDescription } from "./ui/alert";
import { type ApiError } from "~/lib/axios";

type Response = { token: string };
type Variables = { idToken: string };

export function GoogleOAuthButton() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loginMutation = useMutation<Response, ApiError, Variables>({
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      const nextURL = searchParams.get("next");

      navigate(nextURL ?? "/dashboard");
    },
    meta: {
      errorToast: false,
    },
  });

  return (
    <div className="space-y-6">
      {loginMutation.isError && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert
            variant="destructive"
            className="border-red text-red bg-red-foreground"
          >
            <AlertDescription>
              {loginMutation.error?.response?.data?.message ??
                loginMutation.error?.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      <div style={{ colorScheme: "light" }}>
        <GoogleLogin
          text="continue_with"
          size="large"
          width={300}
          useOneTap
          theme="filled_blue"
          onSuccess={(credentialResponse) => {
            const credential = credentialResponse.credential;
            if (!credential) return;

            loginMutation.mutate({
              idToken: credential,
            });
          }}
        />
      </div>
    </div>
  );
}
