import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { JwtPayload } from 'src/auth/types';
import { FeedbackDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  getAllByProjectId(
    @GetCurrentUser() user: JwtPayload,
    @Query('projectId') projectId: string,
  ) {
    if (!projectId) throw new BadRequestException('Project id is required');

    return this.feedbackService.getAllByProjectId({
      userId: user.sub,
      projectId,
    });
  }

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  createByProjectId(@Body() dto: FeedbackDto) {
    return this.feedbackService.createByProjectId({ dto });
  }
}
