import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteMemberInviteParam
  implements Pick<ProjectMember, 'projectId'>
{
  @IsNotEmpty()
  @IsString()
  memberInviteId: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}
