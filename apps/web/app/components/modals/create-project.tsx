import { useSearchParams } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export function CreateProject() {
  const [_, setSearchParams] = useSearchParams();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          setSearchParams((prev) => {
            prev.delete("modal");
            return prev;
          });
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
