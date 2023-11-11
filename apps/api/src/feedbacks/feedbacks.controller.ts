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
import { Device, GetCurrentUser, Origin, Public } from 'src/common/decorators';
import type { JwtPayload } from 'src/auth/types';
import { FeedbackDto } from './dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAllByProjectId(
    @GetCurrentUser() user: JwtPayload,
    @Query('projectId') projectId: string,
    @Query('search') search: string,
  ) {
    if (!projectId) throw new BadRequestException('Project id is required');

    return this.feedbackService.getAllByProjectId({
      userId: user.sub,
      projectId,
      search,
    });
  }

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  createByProjectId(
    @Body() dto: FeedbackDto,
    @Device() device: string,
    @Origin() origin: string,
  ) {
    return this.feedbackService.createByProjectId({ dto, origin, device });
  }
}
