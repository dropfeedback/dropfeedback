import { ApiProperty } from '@nestjs/swagger';
import { ProjectMember, User } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class AddMemberBodyDto
  implements Pick<ProjectMember, 'role'>, Pick<User, 'email'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(['manager', 'member'])
  role: 'manager' | 'member';
}
