import { ApiProperty } from '@nestjs/swagger';
import { ProjectMember } from '@prisma/client';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteMemberInviteDto implements Pick<ProjectMember, 'projectId'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  memberInviteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
