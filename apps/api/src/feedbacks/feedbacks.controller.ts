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
import {
  Device,
  GetCursorPagination,
  Origin,
  Public,
} from 'src/common/decorators';
import { FeedbackDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CursorPagination, OrderBy } from 'src/common/types';
import { GetOderBy } from 'src/common/decorators/order-by.decorator';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  getAllByProjectId(
    @Query('projectId') projectId: string,
    @Query('search') search: string,
    @GetCursorPagination() pagination: CursorPagination,
    @GetOderBy() orderBy: OrderBy,
  ) {
    if (!projectId) throw new BadRequestException('Project id is required');

    return this.feedbackService.getAllByProjectId({
      projectId,
      search,
      pagination,
      orderBy,
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
