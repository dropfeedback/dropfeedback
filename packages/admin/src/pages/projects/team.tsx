import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TeamInviteModal } from "@/components/team-invite-modal";
import { Separator } from "@/components/ui/separator";
import { TeamSkeleton } from "@/components/team-skeleton";
import { TeamMemberTable } from "@/components/team-member-table";
import { TeamInviteTable } from "@/components/team-invite-table";
import { fetchers } from "@/lib/fetchers";
import { type ProjectTeam } from "@/types";

export const PageProjectTeam = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const team = useQuery<ProjectTeam>({
    queryKey: ["team", projectId],
    queryFn: () => fetchers.getProjectTeam(projectId),
  });

  if (team.isError) return <p>Could not load team</p>;

  return (
    <>
      <div className="container flex flex-wrap items-center justify-between gap-4 py-8">
        <div>
          <h2 className="text-3xl tracking-wide">Team</h2>
          <p className="mt-1 text-muted-foreground">
            Manage and invite team members.
          </p>
        </div>
        <TeamInviteModal />
      </div>
      <Separator className="mb-6" />
      <div className="container">
        <div className="mb-6 rounded-lg border p-2 md:p-12">
          <div className="m-auto max-w-[500px] space-y-8">
            {team.isPending ? (
              <TeamSkeleton />
            ) : (
              <>
                <div className="rounded-sm border">
                  <h3 className="bg-accent py-2 pl-4 font-semibold text-muted-foreground">
                    Members
                  </h3>
                  <TeamMemberTable members={team.data.members} />
                </div>
                <div className="rounded-sm border">
                  <h3 className="bg-accent py-2 pl-4 font-semibold text-muted-foreground">
                    Invites
                  </h3>
                  <TeamInviteTable invites={team.data.invites} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
