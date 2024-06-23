import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchers } from "@/lib/fetchers";
import { type ApiError } from "@/lib/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TokenResponse } from "@/types";

type Variables = { idToken: string };

export function GoogleOAuthButton() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loginMutation = useMutation<TokenResponse, ApiError, Variables>({
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      const nextURL = searchParams.get("next");

      navigate(nextURL ?? "/projects");
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
            className="border-red bg-red-foreground text-red"
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
