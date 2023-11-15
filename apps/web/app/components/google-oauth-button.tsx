import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { fetchers } from "~/lib/fetchers";

type Response = { token: string };
type Variables = { idToken: string };

const useGoogleLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useMutation<Response, AxiosError, Variables>({
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      const nextURL = searchParams.get("next");

      navigate(nextURL ?? "/dashboard");
    },
  });
};

export default function GoogleOAuthButton() {
  const { mutate } = useGoogleLogin();

  return (
    <GoogleLogin
      text="continue_with"
      size="large"
      width={240}
      onSuccess={(credentialResponse) => {
        const credential = credentialResponse.credential;
        if (!credential) return;

        mutate({
          idToken: credential,
        });
      }}
    />
  );
}
