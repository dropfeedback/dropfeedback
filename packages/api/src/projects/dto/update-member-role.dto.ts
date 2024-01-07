import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(['owner', 'manager', 'member'], {
    message: 'Role must be owner, manager or member',
  })
  @ApiProperty({ enum: [, 'owner', 'manager', 'member'] })
  role: 'owner' | 'manager' | 'member';
}
