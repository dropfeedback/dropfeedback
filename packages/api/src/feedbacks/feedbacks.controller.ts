import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import {
  Device,
  GetCurrentUser,
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
import { JwtPayload } from 'src/auth/types';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllByProjectId(
    @Query() param: GetAll,
    @GetCursorPagination() pagination: CursorPagination,
    @GetOderBy() orderBy: OrderBy,
    @GetCurrentUser() user: JwtPayload,
  ) {
    if (!param.projectId)
      throw new BadRequestException('Project id is required');

    await this.feedbackService.getProjectMember({
      projectId: param.projectId,
      userId: user.sub,
    });

    return this.feedbackService.getAllByProjectId({
      ...param,
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
  ) {
    await this.feedbackService.createByProjectId({ dto, origin, device });
  }

  @Get('/:feedbackId')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param() param: GetOneParam,
    @GetCurrentUser() user: JwtPayload,
  ) {
    return this.feedbackService.getById({
      id: param.feedbackId,
      userId: user.sub,
    });
  }

  @Patch('/:feedbackId/status')
  @HttpCode(HttpStatus.CREATED)
  async setStatus(
    @Body() dto: SetStatusDto,
    @Param() param: SetStatusParam,
    @GetCurrentUser() user: JwtPayload,
  ) {
    await this.feedbackService.getProjectMember({
      projectId: dto.projectId,
      userId: user.sub,
    });

    return this.feedbackService.setStatus({
      dto,
      id: param.feedbackId,
    });
  }
}
