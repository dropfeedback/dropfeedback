import { useQuery } from "@tanstack/react-query";
import { fetchers } from "~/lib/fetchers";
import type { MeResponse } from "~/lib/fetchers";

export const useMe = () => {
  const result = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: () => fetchers.me(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return result;
};
