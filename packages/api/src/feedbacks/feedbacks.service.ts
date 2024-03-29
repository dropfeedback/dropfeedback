import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Feedback,
  FeedbackCategory,
  FeedbackStatus,
  FeedbackType,
  Project,
} from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

import { CreateFeedbackDto, SetStatusDto } from './dto';

import type { CursorPagination, OrderBy } from 'src/common/types';

@Injectable()
export class FeedbacksService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

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
    const feedback = await this.prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedback) throw new NotFoundException('Feedback not found');

    return feedback;
  }

  async createByProjectId({
    dto,
    projectId,
    origin,
    device,
  }: {
    dto: CreateFeedbackDto;
    projectId: string;
    origin: string;
    device: string;
  }) {
    try {
      const feedback = await this.prisma.feedback.create({
        data: {
          projectId,
          ...dto,
          type: FeedbackType.category,
          origin,
          device,
          meta: dto.meta || {},
        },
        include: {
          project: true,
        },
      });

      this.sendFeedbackNotificationMail({ feedback });

      return feedback;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Project not found');
      }

      throw new BadRequestException({ ...error });
    }
  }

  async setStatus({
    dto,
    projectId,
    id,
  }: {
    dto: SetStatusDto;
    projectId: string;
    id: string;
  }) {
    const { status } = dto;

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

  async sendFeedbackNotificationMail({
    feedback,
  }: {
    feedback: Feedback & {
      project: Project;
    };
  }) {
    const projectMembers = await this.prisma.projectMember.findMany({
      where: {
        projectId: feedback.projectId,
      },
      include: {
        user: {
          include: {
            UserProvider: true,
          },
        },
      },
    });

    projectMembers?.forEach((member) => {
      // has permission to receive email notification
      if (!member?.emailNotification) return;
      // has  atleast one verified email (all providers binded to one email)
      if (!member.user.UserProvider.some((provider) => provider.emailVerified))
        return;

      return this.mailService.sendFeedbackNotificationMail({
        email: member.user.email,
        feedback,
      });
    });
  }
}
