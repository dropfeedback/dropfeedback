import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class LeaveProjectParam implements Pick<ProjectMember, 'projectId'> {
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
