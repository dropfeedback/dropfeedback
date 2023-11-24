import { ProjectMember, User } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class AddMemberDto
  implements Pick<ProjectMember, 'role'>, Pick<User, 'email'>
{
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['manager', 'member'])
  role: 'manager' | 'member';
}
