import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { FeedbackStatus, FeedbackCategory } from 'src/prisma';

export class GetAllDto {
  @IsOptional()
  search?: string;

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
}
