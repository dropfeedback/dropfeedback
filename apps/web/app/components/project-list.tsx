import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { ProjectEmptyView } from "./project-empty-view";
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

  if (isPending) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) return <ProjectEmptyView />;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
