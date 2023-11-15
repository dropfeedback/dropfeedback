import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { fetchers } from "~/lib/fetchers";

type Response = { token: string };
type Variables = { idToken: string };

const useGoogleLogin = () => {
  const navigate = useNavigate();

  return useMutation<Response, AxiosError, Variables>({
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      navigate("/dashboard");
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
