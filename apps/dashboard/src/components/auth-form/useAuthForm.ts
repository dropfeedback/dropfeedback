import { AuthPayload, AuthSchema } from "@/lib/api/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormType } from "./types";
import { api } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  type: AuthFormType;
};

export const useAuthForm = (props: Props) => {
  const queryClient = useQueryClient();

  const apiMethod = props.type === "signup" ? api.signup : api.signin;
  const { mutate, ...mutationResult } = useMutation(apiMethod, {
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const form = useForm<AuthPayload>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "demo@demo.com",
      password: "123456",
    },
  });

  const onSubmit = async (values: AuthPayload) => {
    mutate(values);
  };

  return {
    mutationResult,
    ...form,
    onSubmit,
  };
};
