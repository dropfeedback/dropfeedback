import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedbackDto } from './dto';
import { CursorPagination, OrderBy } from 'src/common/types';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async getAllByProjectId({
    projectId,
    search,
    pagination,
    orderBy,
  }: {
    projectId: string;
    search?: string;
    pagination?: CursorPagination;
    orderBy?: OrderBy;
  }) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.feedback.findMany({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy,
        ...pagination,
      }),
      this.prisma.feedback.count({ where: { projectId } }),
    ]);

    const nextCursor = data[data.length - 1]?.id;
    const prevCursor = data[0]?.id;

    return {
      data,
      total,
      nextCursor,
      prevCursor,
    };
  }

  async createByProjectId({
    dto,
    origin,
    device,
  }: {
    dto: FeedbackDto;
    origin: string;
    device: string;
  }) {
    const { projectId, ...data } = dto;

    return this.prisma.feedback.create({
      include: {
        project: true,
      },
      data: {
        origin,
        device,
        ...data,
        projectId,
      },
    });
  }
}
