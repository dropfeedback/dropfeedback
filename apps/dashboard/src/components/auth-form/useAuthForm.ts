import { AuthPayload, AuthSchema } from "@/lib/api/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormType } from "./types";
import { api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Props = {
  type: AuthFormType;
};

export const useAuthForm = (props: Props) => {
  const router = useRouter();

  const apiMethod = props.type === "signup" ? api.signup : api.signin;
  const { mutate, ...mutationResult } = useMutation(apiMethod, {
    onSuccess: () => {
      router.push("/dashboard");
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
