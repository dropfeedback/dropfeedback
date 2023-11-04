import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Project } from 'src/prisma';

export class ProjectDto
  implements Omit<Project, 'id' | 'createdAt' | 'userId'>
{
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;
}
