import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Feedback, FeedbackStatus } from 'src/prisma';

export class SetStatusDto
  implements
    Omit<
      Feedback,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'userId'
      | 'device'
      | 'origin'
      | 'content'
      | 'meta'
      | 'category'
      | 'resolution'
      | 'reportIdentifier'
      | 'url'
      | 'type'
      | 'projectId'
    >
{
  @ApiProperty({ enum: ['new', 'archived'], default: 'new' })
  @IsEnum(['new', 'archived'], {
    message: 'Invalid status. Should be one of: "new", "archived"',
  })
  status: FeedbackStatus;
}
