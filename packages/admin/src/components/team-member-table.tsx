import { type ProjectMember } from "@/types";
import { TeamMemberActions } from "./team-member-actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export function TeamMemberTable({ members }: { members: ProjectMember[] }) {
  return (
    <Table>
      <TableBody>
        {members
          .sort((a, b) => a.fullName.localeCompare(b.fullName))
          .map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={member.avatarUrl}
                      alt={`${member.fullName}`}
                    />
                    <AvatarFallback>{`${member.fullName}`}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">
                      {`${member.fullName}`}
                    </p>
                    <p className="text-muted-foreground">{member.email}</p>
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
  );
}
