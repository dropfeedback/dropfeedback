import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Close } from "@radix-ui/react-popover";
import { fetchers } from "@/lib/fetchers";
import type { ProjectInvite } from "@/types";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function UserInviteCard({ projectName, projectId }: ProjectInvite) {
  const queryClient = useQueryClient();

  const { mutate: acceptInvite } = useMutation({
    mutationFn: fetchers.acceptInvite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({ queryKey: ["user-invites"] }),
      ]);
    },
  });
  const { mutate: rejectInvite } = useMutation({
    mutationFn: fetchers.rejectInvite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-invites"] });
    },
  });

  const handleAcceptInvite = () => {
    acceptInvite({ projectId });
  };

  const handleRejectInvite = () => {
    rejectInvite({ projectId });
  };

  return (
    <div className="border-b bg-amber-foreground p-2">
      <motion.div
        className="container"
        exit={{ opacity: 0, x: "100%", transition: { duration: 0.2 } }}
      >
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <p>
            You have been invited to the project{" "}
            <span className="font-semibold">{projectName}</span>.
          </p>
          <div className="space-x-2">
            <Button variant="default" onClick={handleAcceptInvite} size="sm">
              Accept
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="destructive" size="sm">
                  Reject
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center" className="p-3">
                <p className="font-medium text-primary">
                  Are you sure you want to reject this invite?
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="default"
                    onClick={handleRejectInvite}
                    size="sm"
                    className="h-7"
                  >
                    Yes
                  </Button>
                  <Close asChild>
                    <Button variant="outline" size="sm" className="h-7">
                      No
                    </Button>
                  </Close>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
