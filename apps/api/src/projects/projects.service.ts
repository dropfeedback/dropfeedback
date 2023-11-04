import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';
import { ProjectMemberRole, ProjectMemberState } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async getAllByUser({ id }: { id: string }) {
    const projects = await this.prisma.project.findMany({
      where: { userId: id },
    });

    return projects;
  }

  async createProject({ userId, dto }: { userId: string; dto: ProjectDto }) {
  async members({ projectId }: { projectId: string }) {
    const members = await this.prisma.projectMember.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return members.map((m) => ({
      id: m.user.id,
      email: m.user.email,
      state: m.state,
      role: m.role,
    }));
  }

  async addMember({
    projectId,
    email,
    role,
  }: {
    projectId: string;
    email: string;
    role: 'manager' | 'member';
  }) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      // create temporary user
      user = await this.prisma.user.create({
        data: {
          email,
          isTemporary: true,
        },
      });
    }

    const projectMember = await this.prisma.projectMember.findUnique({
      where: { userId_projectId: { projectId, userId: user.id } },
    });
    if (projectMember) {
      throw new ConflictException('User already in project');
    }

    const createdProjectMember = await this.prisma.projectMember.create({
      data: {
        projectId,
        userId: user.id,
        role,
        state: ProjectMemberState.pending,
      },
    });

    const mailToken = await this.jwtService.signAsync(
      { projectMemberId: createdProjectMember.id },
      {
        expiresIn: this.config.get<number>('EMAIL_TOKEN_EXPIRES_IN'),
        secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}-${user.id}`,
      },
    );
    return mailToken;

    //TODO: send you are added project mail here with mail and mail token
  }

  async removeMember({
    operatorId,
    projectId,
    memberId,
  }: {
    operatorId: string;
    projectId: string;
    memberId: string;
  }) {
    await this.checkAuthorized({ operatorId, projectId, memberId });
    //TODO: your account removed from project mail will send here
    return this.prisma.projectMember.delete({
      where: { userId_projectId: { projectId, userId: memberId } },
    });
  }

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

  async checkAuthorized({
    projectId,
    operatorId,
    memberId,
  }: {
    operatorId: string;
    projectId: string;
    memberId: string;
  }) {
    const [operator, projectMember] = await Promise.all([
      this.prisma.projectMember.findUnique({
        where: { userId_projectId: { projectId, userId: operatorId } },
        select: { role: true },
      }),
      this.prisma.projectMember.findUnique({
        where: { userId_projectId: { projectId, userId: memberId } },
        select: { role: true },
      }),
    ]);

    if (!operator || !projectMember)
      throw new BadRequestException(
        'Operator or member does not exist in this project',
      );

    switch (projectMember.role) {
      case ProjectMemberRole.arkadaslar:
      case ProjectMemberRole.owner:
        throw new BadRequestException('You can not remove owner');
      case ProjectMemberRole.manager:
        if (
          operator.role !== ProjectMemberRole.owner &&
          operator.role !== ProjectMemberRole.arkadaslar
        )
          throw new BadRequestException('Only owner can remove manager');
    }
  }
}
