import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class GetInvitesDto implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
