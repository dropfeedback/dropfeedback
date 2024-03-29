import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Feedback, FeedbackCategory, FeedbackStatus, Prisma } from 'src/prisma';

export class CreateFeedbackDto
  implements
    Omit<
      Feedback,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'userId'
      | 'device'
      | 'origin'
      | 'type'
      | 'projectId'
    >
{
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  meta: Prisma.JsonValue | null;

  @ApiProperty({ enum: ['other', 'issue', 'idea'], default: 'other' })
  @IsOptional()
  @IsEnum(['other', 'issue', 'idea'], {
    message: 'Invalid category. Should be one of: "new", "archived", "other"',
  })
  category: FeedbackCategory;

  @ApiProperty({ enum: ['new', 'archived'], default: 'new' })
  @IsOptional()
  @IsEnum(['new', 'archived'], {
    message: 'Invalid status. Should be one of: "new", "archived"',
  })
  status: FeedbackStatus;

  @IsOptional()
  reportIdentifier: string | null;

  @IsOptional()
  resolution: string | null;

  @IsOptional()
  url: string | null;
}
