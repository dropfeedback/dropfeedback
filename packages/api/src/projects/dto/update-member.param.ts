import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMemberRoleParam implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}
