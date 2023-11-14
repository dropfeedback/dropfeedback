import { createMutation } from "react-query-kit";
import { type AxiosError } from "axios";
import { axiosInstance } from "~/lib/axios";

type Response = null;
type Variables = { email: string; password: string };

export const useLocalSignup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { data } = await axiosInstance.post<Response>(
      "/auth/local/signup",
      variables,
    );

    return data;
  },
});
