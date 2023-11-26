import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Feedback, FeedbackStatus } from 'src/prisma';

export class SetStatusDto
  implements
    Omit<
      Feedback,
      | 'id'
      | 'createdAt'
      | 'userId'
      | 'device'
      | 'origin'
      | 'content'
      | 'meta'
      | 'category'
    >
{
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @ApiProperty({ enum: ['new', 'archived'], default: 'new' })
  @IsEnum(['new', 'archived'], {
    message: 'Invalid status. Should be one of: "new", "archived"',
  })
  status: FeedbackStatus;
}
