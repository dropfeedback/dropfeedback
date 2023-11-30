import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { type ProjectMember } from "~/types";

const roles = [
  {
    value: "owner",
    name: "Owner",
    description:
      "Can add/remove members, change roles, and delete the project.",
  },
  {
    value: "manager",
    name: "Manager",
    description: "Can add/remove members and change roles.",
  },
  {
    value: "member",
    name: "Member",
    description: "Can view the project and its feedbacks.",
  },
];

export function TeamMemberActions({ member }: { member: ProjectMember }) {
  const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" title="Actions">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Change role
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red"
          >
            Remove from project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Change {member.firstName} {member.lastName}&apos;s role on this
              project
            </DialogTitle>
            <DialogDescription>
              This will change the permissions of this person on this project.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <RadioGroup defaultValue={member.role.toString()} className="gap-4">
            {roles.map((role) => (
              <div key={role.value} className="flex items-start gap-2">
                <RadioGroupItem value={role.value} id={role.value} />
                <Label htmlFor={role.value}>
                  <div className="mb-1 font-medium leading-none">
                    {role.name}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {role.description}
                  </p>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Change Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {member.firstName} {member.lastName} from this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This person will no longer have
              access to this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}