import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { fetchers } from "~/lib/fetchers";
import type { Project } from "~/types";

export function ProjectList() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetchers.getProjects(),
  });

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.name}
          totalFeedbacks={project.feedbackCount}
          createdAt={new Date(project.createdAt).toLocaleDateString()}
          currentPlan={"Free"}
        />
      ))}
    </div>
  );
}