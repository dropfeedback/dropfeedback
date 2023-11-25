import { ApiProperty } from '@nestjs/swagger';
import { ProjectMember, User } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class InviteMemberDto
  implements Pick<ProjectMember, 'role'>, Pick<User, 'email'>
{
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['manager', 'member'])
  @ApiProperty({ enum: ['manager', 'member'] })
  role: 'manager' | 'member';
}
