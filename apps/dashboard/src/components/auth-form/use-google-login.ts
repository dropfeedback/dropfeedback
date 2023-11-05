import { api } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(api.googleLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return { ...mutation, login: mutation.mutate };
};
