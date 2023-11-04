import { ApiProperty } from '@nestjs/swagger';
import { ProjectMember } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AddMemberParamDto implements Pick<ProjectMember, 'projectId'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
