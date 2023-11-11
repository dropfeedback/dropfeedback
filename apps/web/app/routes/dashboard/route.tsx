import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ProjectCard } from "~/components/project-card";
import { Button } from "~/components/ui/button";

const projects = [
  {
    id: "1",
    title: "Web app",
    totalFeedbacks: 123,
    createdAt: "212d ago",
    currentPlan: "Free",
  },
  {
    id: "2",
    title: "Blog",
    totalFeedbacks: 123,
    createdAt: "24d ago",
    currentPlan: "Pro",
  },
  {
    id: "3",
    title: "E-commerce app",
    totalFeedbacks: 123,
    createdAt: "123d ago",
    currentPlan: "Pro",
  },
  {
    id: "4",
    title: "Portfolio",
    totalFeedbacks: 123,
    createdAt: "342d ago",
    currentPlan: "Free",
  },
];

export default function Dashboard() {
  return (
    <div className="container py-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
      <br />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            totalFeedbacks={project.totalFeedbacks}
            createdAt={project.createdAt}
            currentPlan={project.currentPlan}
          />
        ))}
      </div>
    </div>
  );
}
