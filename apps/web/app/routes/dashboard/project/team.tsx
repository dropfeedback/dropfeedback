import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import InviteMemberModal from "~/components/invite-member-modal";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { fetchers } from "~/lib/fetchers";

export default function Teams() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const members = useQuery({
    queryKey: ["members", { projectId }],
    queryFn: () => fetchers.getProjectMembers(projectId),
  });

  return (
    <div className="h-full space-y-6 bg-background">
      <div className="container p-8 pb-0">
        <h2 className="text-3xl tracking-wide">Members</h2>
        <p className="mt-1 text-muted-foreground">
          Manage and invite team members.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="container">
        <div className="rounded-sm border bg-accent/50 p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Invite new members by email address</p>
            <InviteMemberModal>
              <Button>Invite</Button>
            </InviteMemberModal>
          </div>
          <Separator className="my-4" />
        </div>
      </div>
    </div>
  );
}
