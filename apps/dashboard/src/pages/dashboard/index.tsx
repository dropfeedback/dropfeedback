import { DashboardHeader } from "@/components/dashboard-header";
import { FeedbackList } from "@/components/feedback-list";
import { ProjectSwitcher } from "@/components/project-switcher";
import { UserNav } from "@/components/user-nav";
import { cn, useFeedbacks, useProjects } from "@/lib";

export default function Dashboard() {
  const {
    data: projects = [],
    selectedProject,
    setSelectedProject,
  } = useProjects();

  return (
    <div className={cn("max-w-5xl mx-auto", "flex flex-col")}>
      <DashboardHeader>
        <ProjectSwitcher
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <UserNav />
      </DashboardHeader>

      {selectedProject?.id && (
        <FeedbackList projectId={selectedProject.id} className="py-8" />
      )}
    </div>
  );
}

Dashboard.auth = true;
