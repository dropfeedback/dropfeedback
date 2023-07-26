import { api } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetFeedbacksParams, Project } from "../validators";
import { toast } from "react-hot-toast";

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

export const useFeedbacks = ({ projectId }: GetFeedbacksParams) => {
  const result = useQuery({
    queryKey: ["getFeedbacks"],
    queryFn: () => api.getFeedbacks({ projectId }),
    enabled: !!projectId,
  });

  return result;
};
