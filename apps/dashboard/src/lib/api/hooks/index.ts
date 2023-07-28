import { api } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetFeedbacksParams, MeResponse, Project } from "../validators";
import { toast } from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";

export const useProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const project = JSON.parse(localStorage.getItem("selectedProject")!);
        return project;
      } catch (error) {
        return null;
      }
    }

    return null;
  });

  const result = useQuery({
    queryKey: ["getProjects"],
    queryFn: () => api.getProjects(),
  });

  useEffect(() => {
    if (selectedProject) return;
    setSelectedProject(result.data?.[0] ?? null);
  }, [selectedProject, result.data]);

  return { ...result, selectedProject, setSelectedProject };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const result = useMutation(api.createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      toast.success("Project created successfully");
    },
  });

  return result;
};

export const useFeedbacks = (params: GetFeedbacksParams) => {
  const debouncedSearch = useDebounce(params?.search || "", 200);

  const result = useQuery({
    queryKey: ["getFeedbacks", params?.projectId, debouncedSearch],
    queryFn: () => api.getFeedbacks(params),
    enabled: !!params?.projectId,
    keepPreviousData: true,
    staleTime: 1000,
  });

  return result;
};

export const useMe = () => {
  const result = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: () => api.me(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return result;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const result = useMutation(api.logout, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Logout successfully");
    },
  });

  return result;
};
