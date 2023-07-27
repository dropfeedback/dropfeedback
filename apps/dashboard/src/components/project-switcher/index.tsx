import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useState } from "react";
import { Project } from "@/lib/api/validators";
import { useCopyToClipboard } from "@/hooks/useClipboard";
import { NewProjecDialog } from "./new-project-dialog";

type Props = {
  loading?: boolean;
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  onNewProjectClick?: () => void;
};

export const ProjectSwitcher = (props: Props) => {
  const { projects, selectedProject, setSelectedProject } = props;

  const [open, setOpen] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);

  const { copy } = useCopyToClipboard();

  const onProjectCreated = (project: Project) => {
    setSelectedProject(project);
    setShowNewProject(false);
  };

  return (
    <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a project"
              className="select-text"
            >
              {selectedProject?.name} - {selectedProject?.id}
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => copy(selectedProject?.id || "")}
          >
            Copy ID
          </Button>
        </div>
        <PopoverContent className="w-max p-2">
          <Command>
            <CommandList>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    setSelectedProject(project);
                    setOpen(false);
                  }}
                  className="text-sm cursor-pointer p-2"
                >
                  {project.name} - {project.id}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedProject?.id === project.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewProject(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <NewProjecDialog
        onFinish={onProjectCreated}
        onCancelClick={() => setShowNewProject(false)}
      />
    </Dialog>
  );
};
