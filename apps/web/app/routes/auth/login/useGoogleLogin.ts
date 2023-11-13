import { createMutation } from "react-query-kit";
import { type AxiosError } from "axios";
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
