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
      return newProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('User not found');
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Project name already exists');
      }

      throw new BadRequestException('Something went wrong');
    }
  }
}
