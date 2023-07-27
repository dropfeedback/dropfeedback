import React, { useState } from "react";
import { useCreateProject } from "@/lib";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Project } from "@/lib/api/validators";

interface Props {
  onFinish: (project: Project) => void;
  onCancelClick: () => void;
}

export const NewProjecDialog = ({ onFinish, onCancelClick }: Props) => {
  const [newProjectName, setNewProjectName] = useState("");

  const { mutateAsync } = useCreateProject();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const project = await mutateAsync({ name: newProjectName });
      onFinish(project);
    } catch (error) {}
  };

  return (
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
        <Button variant="outline" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button form="create-project-form" type="submit">
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
