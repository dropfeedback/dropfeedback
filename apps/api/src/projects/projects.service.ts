import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async getAllByUser({ id }: { id: string }) {
    const projects = await this.prisma.project.findMany({
      where: { userId: id },
    });

    return projects;
  }

  async createProject({ userId, dto }: { userId: string; dto: ProjectDto }) {
    try {
      const newProject = await this.prisma.project.create({
        data: {
          name: dto.name,
          user: { connect: { id: userId } },
        },
      });
  async hasAccess({
    acceptedRoles,
    projectId,
    userId,
  }: {
    acceptedRoles: ProjectMemberRole[];
    projectId: string;
    userId: string;
  }) {
    const projectMember = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          projectId,
          userId,
        },
      },
    });

    if (!projectMember) throw new NotFoundException('User not found');

    return acceptedRoles.includes(projectMember.role);
  }
    }
  }
}
