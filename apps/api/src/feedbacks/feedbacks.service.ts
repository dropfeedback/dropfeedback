import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedbackDto } from './dto';

@Injectable()
export class FeedbacksService {
  constructor(private prisma: PrismaService) {}

  async getAllByProjectId({
    projectId,
    search,
  }: {
    projectId: string;
    userId: string;
    search?: string;
  }) {
    return this.prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        projectId,
        content: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
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
