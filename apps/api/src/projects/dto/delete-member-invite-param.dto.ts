import { ProjectMember } from '@prisma/client';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteMemberInviteDto implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  memberInviteId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
