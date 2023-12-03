import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { fetchers } from "~/lib/fetchers";
import type { Project } from "~/types";

export function ProjectList() {
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetchers.getProjects(),
  });

  if (isError) return <p>An error occurred while fetching your projects.</p>;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {isPending
        ? Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))
        : projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
    </div>
  );
}
