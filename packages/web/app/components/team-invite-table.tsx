import { TeamInviteActions } from "./team-invite-actions";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { cn } from "~/lib/utils";
import { MemberInviteState, type ProjectMemberInvite } from "~/types";

export function TeamInviteTable({
  invites,
}: {
  invites: ProjectMemberInvite[];
}) {
  if (invites.length === 0) {
    return (
      <div className="text-center py-3">
        <p className="text-muted-foreground">No invites yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableBody>
        {invites.map((invite) => (
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
  );
}
