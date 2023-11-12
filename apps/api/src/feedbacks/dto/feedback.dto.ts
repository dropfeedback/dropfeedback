import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Feedback, Prisma } from 'src/prisma';

export class FeedbackDto
  implements
    Omit<Feedback, 'id' | 'createdAt' | 'userId' | 'device' | 'origin'>
{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  content: string;

  meta: Prisma.JsonValue | null;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}
