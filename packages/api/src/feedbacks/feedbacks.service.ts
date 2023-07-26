import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from 'src/projects/dto';
import { FeedbackDto } from './dto';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async getAllByProjectId({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }) {
    try {
      const feedbacks = await this.prisma.feedback.findMany({
        where: {
          projectId,
          project: {
            userId,
          },
        },
      });
      return feedbacks;
    } catch (error) {
      if (error.code === 'P2023') {
        throw new BadRequestException('Project Id is invalid');
      }
    }
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

    try {
      const newFeedback = await this.prisma.feedback.create({
        include: {
          project: true,
        },
        data: {
          origin,
          device,
          ...data,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      return newFeedback;
    } catch (error) {
      if (error.code === 'P2023' || error.code === 'P2025') {
        throw new BadRequestException('Project ID is Invalid');
      }

      throw new BadRequestException('Something went wrong');
    }
  }
}
