"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn, useCreateProject } from "@/lib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Project } from "@/lib/api/validators";
import { useCopyToClipboard } from "@/hooks/useClipboard";

type Props = {
  loading?: boolean;
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
};

export const ProjectSwitcher = (props: Props) => {
  const { projects, selectedProject, setSelectedProject } = props;

  const [open, setOpen] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const { mutateAsync } = useCreateProject();

  const { copy } = useCopyToClipboard();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const project = await mutateAsync({ name: newProjectName });
      setSelectedProject(project);
      setShowNewProject(false);
    } catch (error) {}
  };

  return (
    <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
      <Popover open={open} onOpenChange={setOpen}>
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Add a new project to get feedback.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <form
              id="create-project-form"
              onSubmit={formSubmitHandler}
              className="space-y-2"
            >
              <Label htmlFor="name" aria-required>
                Project name
              </Label>
              <Input
                id="name"
                required
                placeholder="Acme Inc."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </form>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewProject(false)}>
            Cancel
          </Button>
          <Button form="create-project-form" type="submit">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
