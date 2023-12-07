import { IsString, MinLength } from 'class-validator';
import { Project } from 'src/prisma';

export class UpdateProjectDto
  implements Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
{
  @IsString()
  @MinLength(3)
  name: string;
}
