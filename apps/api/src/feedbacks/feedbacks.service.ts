import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto } from './dto';
import { CursorPagination, OrderBy } from 'src/common/types';
import { SetStatusDto } from './dto/set-status.dto';
import { FeedbackCategory, FeedbackStatus } from '@prisma/client';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async getAllByProjectId({
    projectId,
    search,
    category,
    status,
    pagination = {},
    orderBy = {},
  }: {
    projectId: string;
    search?: string;
    status?: FeedbackStatus;
    category?: FeedbackCategory;
    pagination?: CursorPagination;
    orderBy?: OrderBy;
  }) {
    try {
      // find project by id
      await this.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Project not found');
      }

      throw new NotFoundException(error.message);
    }

    const [
      data,
      countAll,
      countCurrent,
      countArchived,
      countNew,
      countIdea,
      countIssue,
      countOther,
    ] = await Promise.all([
      // get feedbacks
      this.prisma.feedback.findMany({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          category,
          status,
        },
        orderBy,
        ...pagination,
      }),
      // get counts without filters
      this.prisma.feedback.count({
        where: {
          projectId,
        },
      }),
      // get counts with filters
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          category,
          status,
        },
      }),
      // get counts of archived with search
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          status: 'archived',
        },
      }),
      // get counts of new with search
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          status: 'new',
        },
      }),
      // get counts of idea with search
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          category: 'idea',
          status: 'new',
        },
      }),
      // get counts of issue with search
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          category: 'issue',
          status: 'new',
        },
      }),
      // get counts of other with search
      this.prisma.feedback.count({
        where: {
          projectId,
          content: {
            contains: search,
            mode: 'insensitive',
          },
          category: 'other',
          status: 'new',
        },
      }),
    ]);

    const nextCursor = data[data.length - 1]?.id;
    const prevCursor = data[0]?.id;

    return {
      data,
      nextCursor,
      prevCursor,
      countAll, // count without filters
      countCurrent, // count with filters
      countArchived, // count of archived with search
      countNew, // count of new with search
      countIdea, // count of idea with search
      countIssue, // count of issue with search
      countOther, // count of other with search
    };
  }

  async getById({ id }: { id: string }) {
    try {
      return await this.prisma.feedback.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Feedback not found');
      }

      throw new NotFoundException(error.message);
    }
  }

  async createByProjectId({
    dto,
    origin,
    device,
  }: {
    dto: CreateFeedbackDto;
    origin: string;
    device: string;
  }) {
    const { projectId, content, meta, category, status } = dto;

    return this.prisma.feedback.create({
      include: {
        project: true,
      },
      data: {
        origin,
        device,
        content,
        projectId,
        category,
        status,
        meta: meta || {},
      },
    });
  }

  async setStatus({ dto, id }: { dto: SetStatusDto; id: string }) {
    const { status, projectId } = dto;

    try {
      return await this.prisma.feedback.update({
        where: {
          id,
          projectId,
        },
        data: {
          status,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Feedback not found');
      }
      throw new BadRequestException(error.message);
    }
  }
}
