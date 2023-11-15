import { createMutation } from "react-query-kit";
import { type AxiosError } from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@remix-run/react";
import { axiosInstance } from "~/lib/axios";

type Response = { token: string };
type Variables = { idToken: string };

export const useGoogleLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { data } = await axiosInstance.post<Response>(
      "/auth/google/login",
      variables,
    );

    return data;
  },
});

export default function GoogleOAuthButton() {
  const navigate = useNavigate();
  const { mutate } = useGoogleLogin();

  return (
    <GoogleLogin
      text="continue_with"
      size="large"
      width={240}
      onSuccess={(credentialResponse) => {
        const credential = credentialResponse.credential;
        if (!credential) return;

        mutate(
          {
            idToken: credential,
          },
          {
            onSuccess: () => {
              navigate("/dashboard");
            },
          },
        );
      }}
    />
  );
}
