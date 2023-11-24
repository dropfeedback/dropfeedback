import { ProjectMember } from '@prisma/client';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class AcceptInviteParam implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
