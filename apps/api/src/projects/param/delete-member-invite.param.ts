import { ProjectMember } from '@prisma/client';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteMemberInviteParam
  implements Pick<ProjectMember, 'projectId'>
{
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  memberInviteId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
