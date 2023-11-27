import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { CreateFeedbackDto } from './dto';
import { CursorPagination, OrderBy } from 'src/common/types';
import { GetOderBy } from 'src/common/decorators/order-by.decorator';
import { SetStatusDto } from './dto/set-status.dto';
import { SetStatusParam } from './dto/set-status.param';
import { GetAll } from './dto/get-all.query';
import { GetOneParam } from './dto/get-one-param';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAllByProjectId(
    @Query() param: GetAll,
    @GetCursorPagination() pagination: CursorPagination,
    @GetOderBy() orderBy: OrderBy,
  ) {
    if (!param.projectId)
      throw new BadRequestException('Project id is required');

    return this.feedbackService.getAllByProjectId({
      ...param,
      pagination,
      orderBy,
    });
  }

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  createByProjectId(
    @Body() dto: CreateFeedbackDto,
    @Device() device: string,
    @Origin() origin: string,
  ) {
    return this.feedbackService.createByProjectId({ dto, origin, device });
  }

  @Get('/:feedbackId')
  @HttpCode(HttpStatus.OK)
  getById(@Param() param: GetOneParam) {
    return this.feedbackService.getById({ id: param.feedbackId });
  }

  @Post('/:feedbackId')
  @HttpCode(HttpStatus.CREATED)
  setStatus(@Body() dto: SetStatusDto, @Param() param: SetStatusParam) {
    return this.feedbackService.setStatus({ dto, id: param.feedbackId });
  }
}
