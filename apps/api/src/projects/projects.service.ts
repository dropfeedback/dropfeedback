import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import {
  MemberInviteRole,
  MemberInviteState,
  ProjectMemberRole,
} from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}
  async getAllByUser({ id }: { id: string }) {
    const projects = await this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        projectMembers: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        _count: {
          select: {
            feedbacks: true,
          },
        },
        projectMembers: {
          select: {
            role: true,
          },
          where: {
            userId: id,
          },
        },
      },
    });

    return projects.map((pm) => ({
      id: pm.id,
      name: pm.name,
      role: pm.projectMembers[0].role,
      createdAt: pm.createdAt,
      feedbackCount: pm._count.feedbacks,
    }));
  }

  async createProject({
    userId,
    dto,
  }: {
    userId: string;
    dto: CreateProjectDto;
  }) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        projectMembers: {
          create: {
            userId,
            role: ProjectMemberRole.owner,
          },
        },
      },
    });
  }

  async getProjectById({ projectId }: { projectId: string }) {
    return this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async updateProject({ id, dto }: { id: string; dto: UpdateProjectDto }) {
    return this.prisma.project.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
      },
    });
  }

  async deleteProject({ id }: { id: string }) {
    return this.prisma.project.delete({
      where: {
        id: id,
      },
    });
  }

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
      role: m.role,
    }));
  }

  async invites({ projectId }: { projectId: string }) {
    const memberInvites = await this.prisma.memberInvite.findMany({
      where: {
        projectId,
      },
    });

    return memberInvites.map((m) => ({
      id: m.id,
      email: m.email,
      role: m.role,
      state: m.state,
    }));
  }

  async addMember({
    projectId,
    email,
    role,
  }: {
    projectId: string;
    email: string;
    role: MemberInviteRole;
  }) {
    const memberInvite = await this.prisma.memberInvite.findUnique({
      where: {
        email_projectId: { email, projectId },
        state: MemberInviteState.Pending,
      },
    });
    if (memberInvite) {
      throw new ConflictException('Invite already sent');
    }

    const createdInvite = await this.prisma.memberInvite.create({
      data: { email, projectId, role },
      include: { project: true },
    });

    await this.mailService.sendInviteEmail({
      email,
      projectName: createdInvite.project.name,
    });
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

  async cancelInvite(memberInviteId: string) {
    //TODO: your account removed from project mail will send here
    return this.prisma.memberInvite.delete({
      where: { id: memberInviteId },
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
