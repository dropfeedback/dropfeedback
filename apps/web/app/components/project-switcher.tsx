import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { cn } from "~/lib/utils";
import { fetchers } from "~/lib/fetchers";
import { type Project } from "~/types";

export function ProjectSwitcher() {
  const params = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(params?.projectId);
  const [currentProject, setCurrentProject] = useState<Project>();

  const {
    data: projects,
    isPending,
    isError,
    isSuccess,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetchers.getProjects(),
  });

  useEffect(() => {
    if (isSuccess) {
      const project = projects.find(
        (project) => project.id === selectedProjectId,
      );

      if (!project) {
        toast({
          description: "Project not found.",
          action: (
            <ToastAction
              altText="Go to dashboard"
              onClick={() => navigate("/dashboard")}
            >
              Go to dashboard
            </ToastAction>
          ),
        });
      }

      setCurrentProject(project);
    }
  }, [isSuccess, navigate, projects, selectedProjectId, toast]);

  if (isError) return null;

  if (isPending) {
    return (
      <div className="flex gap-1">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-4" />
      </div>
    );
  }

  if (!currentProject) return null;

  return (
    <>
      <Link to={`/dashboard/${currentProject.id}`}>{currentProject.name}</Link>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="-ml-1.5 w-auto px-1">
            <CaretSortIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50 w-[200px] bg-background p-0">
          <Command>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.id}
                  onSelect={(value) => {
                    setSelectedProjectId(value);
                    setOpen(false);
                    navigate(`/dashboard/${value}`);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProjectId === project.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
