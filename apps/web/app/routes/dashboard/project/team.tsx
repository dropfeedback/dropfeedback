import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { InviteMemberModal } from "~/components/invite-member-modal";
import { TeamMemberActions } from "~/components/team-member-actions";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Separator } from "~/components/ui/separator";
import { TeamInviteActions } from "~/components/team-invite-actions";
import { TeamSkeleton } from "~/components/team-skeleton";
import { fetchers } from "~/lib/fetchers";
import { cn } from "~/lib/utils";
import { MemberInviteState, type ProjectTeam } from "~/types";

export default function Teams() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) throw new Error("Project ID is required");

  const team = useQuery<ProjectTeam>({
    queryKey: ["team", projectId],
    queryFn: () => fetchers.getProjectTeam(projectId),
  });

  if (team.isError) return <p>Could not load team</p>;

  return (
    <div className="space-y-6 bg-background">
      <div className="container flex items-center justify-between p-8 pb-0">
        <div>
          <h2 className="text-3xl tracking-wide">Team</h2>
          <p className="mt-1 text-muted-foreground">
            Manage and invite team members.
          </p>
        </div>
        <InviteMemberModal>
          <Button>Invite Member</Button>
        </InviteMemberModal>
      </div>
      <Separator className="my-6" />
      <div className="container">
        <div className="mb-6 rounded-lg border p-12">
          <div className="m-auto max-w-[500px] space-y-8">
            {team.isPending ? (
              <TeamSkeleton />
            ) : (
              <>
                <div className="rounded-sm border">
                  <h3 className="bg-accent py-2 pl-4 font-semibold text-muted-foreground">
                    Members
                  </h3>
                  <Table>
                    <TableBody>
                      {team.data.members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={member.avatarUrl}
                                  alt={`${member.firstName} ${member.lastName}`}
                                />
                                <AvatarFallback>
                                  {member.firstName[0] + member.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium leading-none">
                                  {member.firstName} {member.lastName}
                                </p>
                                <p className="text-muted-foreground">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="w-20 capitalize text-muted-foreground">
                            {member.role}
                          </TableCell>
                          <TableCell className="w-9 text-right">
                            <TeamMemberActions member={member} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="rounded-sm border">
                  <h3 className="bg-accent py-2 pl-4 font-semibold text-muted-foreground">
                    Invites
                  </h3>
                  <Table>
                    <TableBody>
                      {team.data.invites.map((invite) => (
                        <TableRow key={invite.id}>
                          <TableCell>{invite.email}</TableCell>
                          <TableCell className="w-20 capitalize text-muted-foreground">
                            {invite.role}
                          </TableCell>
                          <TableCell className="w-16 text-muted-foreground">
                            <div
                              className={cn(
                                "inline-flex select-none items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
                                {
                                  "bg-amber-foreground text-amber":
                                    invite.state === MemberInviteState.Pending,
                                  "bg-red-foreground text-red":
                                    invite.state === MemberInviteState.Rejected,
                                  "bg-green-foreground text-green":
                                    invite.state === MemberInviteState.Accepted,
                                },
                              )}
                            >
                              {invite.state}
                            </div>
                          </TableCell>
                          <TableCell className="w-9 text-right">
                            <TeamInviteActions invite={invite} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
