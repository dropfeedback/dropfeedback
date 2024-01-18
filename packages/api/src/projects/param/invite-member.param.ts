import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class InviteMemberParam implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
