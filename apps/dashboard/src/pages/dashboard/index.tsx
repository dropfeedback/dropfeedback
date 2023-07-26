import { ProjectSwitcher } from "@/components/project-switcher";
import { cn, useFeedbacks, useProjects } from "@/lib";

export default function Dashboard() {
  const {
    data: projects = [],
    selectedProject,
    setSelectedProject,
  } = useProjects();

  const { data: feedbacks = [] } = useFeedbacks({
    projectId: selectedProject?.id,
  });

  return (
    <div className={cn("max-w-5xl mx-auto", "flex flex-col")}>
      <div className="border-b">
        <div className="flex items-center p-4">
          <ProjectSwitcher
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>
      </div>
    </div>
  );
}

Dashboard.auth = true;
