import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  Device,
  GetCursorPagination,
  Origin,
  Public,
  Roles,
} from 'src/common/decorators';
import { GetOderBy } from 'src/common/decorators';
import { UserRoleGuard } from 'src/common/guards';

import { FeedbacksService } from './feedbacks.service';
import {
  CreateFeedbackDto,
  GetAllDto,
  GetOneParam,
  SetStatusDto,
  SetStatusParam,
} from './dto';

import type { CursorPagination, OrderBy } from 'src/common/types';

@Controller('projects/:projectId/feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  getAllByProjectId(
    @Query() param: GetAllDto,
    @GetCursorPagination() pagination: CursorPagination,
    @GetOderBy() orderBy: OrderBy,
    @Param('projectId') projectId: string,
  ) {
    return this.feedbackService.getAllByProjectId({
      ...param,
      projectId,
      pagination,
      orderBy,
    });
  }

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async createByProjectId(
    @Body() dto: CreateFeedbackDto,
    @Device() device: string,
    @Origin() origin: string,
    @Param('projectId') projectId: string,
  ) {
    await this.feedbackService.createByProjectId({
      dto,
      projectId,
      origin,
      device,
    });
    return { success: true };
  }

  @Get('/:feedbackId')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  getById(@Param() param: GetOneParam) {
    return this.feedbackService.getById({
      id: param.feedbackId,
    });
  }

  @Patch('/:feedbackId/status')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  setStatus(@Body() dto: SetStatusDto, @Param() param: SetStatusParam) {
    return this.feedbackService.setStatus({
      dto,
      projectId: param.projectId,
      id: param.feedbackId,
    });
  }
}
