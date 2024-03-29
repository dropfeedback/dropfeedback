import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  MemberInviteRole,
  MemberInviteState,
  ProjectMemberRole,
} from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

import {
  CreateProjectDto,
  UpdateMemberNotificationsDto,
  UpdateProjectDto,
} from './dto';

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
    try {
      return await this.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Project not found');
      }

      throw new BadRequestException(error.message);
    }
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

  async getTeam({ projectId }: { projectId: string }) {
    const [members, invites] = await Promise.all([
      this.prisma.projectMember.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          projectId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              avatarUrl: true,
              fullName: true,
            },
          },
        },
      }),
      this.prisma.memberInvite.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          projectId,
          state: {
            not: MemberInviteState.accepted,
          },
        },
      }),
    ]);

    return {
      members: members.map((m) => ({
        id: m.user.id,
        email: m.user.email,
        role: m.role,
        avatarUrl: m.user.avatarUrl,
        fullName: m.user.fullName,
        permissions: {
          email: m.emailNotification,
        },
      })),
      invites: invites.map((m) => ({
        id: m.id,
        email: m.email,
        role: m.role,
        state: m.state,
      })),
    };
  }

  async inviteMember({
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
      },
      select: {
        id: true,
        email: true,
        state: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (memberInvite?.state === MemberInviteState.pending) {
      throw new ConflictException('Invite already sent');
    }

    if (memberInvite?.state === MemberInviteState.accepted) {
      // if user is MemberInviteState is accepted, we will check if user is already member of this project
      const member = await this.prisma.projectMember.findFirst({
        where: {
          projectId,
          user: {
            email: memberInvite.email,
          },
        },
      });

      // if user is already member of this project, we will throw error
      if (member) {
        throw new ConflictException('User already member of this project');
      }
      // if user is not member of this project but state is accepted we will send invite again.
      // because state can be out of sync this is very rare edge case.
      // for example: user can be accept an invite, but can be not member of this project on database.
      // to fix this, we will send invite again and update state to pending.
      else {
        await this.prisma.memberInvite.update({
          where: { id: memberInvite.id },
          data: { state: MemberInviteState.pending },
        });
        await this.mailService.sendInviteEmail({
          email,
          projectName: memberInvite.project.name,
        });
        return HttpStatus.OK;
      }
    }

    // if user rejected invite, we will send invite again
    if (memberInvite?.state === MemberInviteState.rejected) {
      await this.prisma.memberInvite.update({
        where: { id: memberInvite.id },
        data: { state: MemberInviteState.pending },
      });
      await this.mailService.sendInviteEmail({
        email,
        projectName: memberInvite.project.name,
      });
      return HttpStatus.OK;
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

  async updateMemberRole({
    operatorId,
    projectId,
    memberId,
    newRole,
  }: {
    operatorId: string;
    projectId: string;
    memberId: string;
    newRole: 'owner' | 'manager' | 'member';
  }) {
    const { operator } = await this.checkAuthorized({
      operatorId,
      projectId,
      memberId,
    });

    if (this.rolePriority[operator.role] < this.rolePriority[newRole]) {
      throw new BadRequestException(
        'You are not allowed to update role to this role',
      );
    }

    return this.prisma.projectMember.update({
      where: { userId_projectId: { projectId, userId: memberId } },
      data: { role: newRole },
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
    await this.checkAuthorized({
      operatorId,
      projectId,
      memberId,
    });
    //TODO: your account removed from project mail will send here
    return this.prisma.projectMember.delete({
      where: { userId_projectId: { projectId, userId: memberId } },
    });
  }

  async leaveProject({
    projectId,
    memberId,
  }: {
    projectId: string;
    memberId: string;
  }) {
    await this.prisma.projectMember.delete({
      where: {
        userId_projectId: {
          projectId,
          userId: memberId,
        },
      },
    });
  }

  async cancelInvite(memberInviteId: string) {
    //TODO: your account removed from project mail will send here
    return this.prisma.memberInvite.delete({
      where: { id: memberInviteId },
    });
  }

  async acceptInvite({
    projectId,
    userId,
    email,
  }: {
    projectId: string;
    userId: string;
    email: string;
  }) {
    const memberInvite = await this.prisma.memberInvite.findFirst({
      where: {
        projectId: projectId,
        email: email,
      },
    });

    if (!memberInvite) {
      throw new ForbiddenException('Invite not found');
    }

    if (memberInvite?.state === MemberInviteState.accepted) {
      throw new ForbiddenException('You already accepted invite.');
    }

    const member = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: { projectId, userId },
      },
    });
    if (member) {
      throw new ForbiddenException('You already member of this project.');
    }

    const [projectMember] = await this.prisma.$transaction([
      this.prisma.projectMember.create({
        data: {
          projectId,
          userId,
          role: memberInvite.role,
        },
      }),
      this.prisma.memberInvite.update({
        where: { id: memberInvite.id },
        data: { state: MemberInviteState.accepted },
      }),
    ]);

    return projectMember;
  }

  async rejectInvite({
    projectId,
    email,
  }: {
    projectId: string;
    email: string;
  }) {
    const invite = await this.prisma.memberInvite.findFirst({
      where: {
        projectId,
        email,
      },
    });

    if (!invite) {
      throw new ForbiddenException('Invite not found');
    }

    if (invite.state === MemberInviteState.accepted) {
      throw new ForbiddenException('You already accepted invite.');
    }

    if (invite.state === MemberInviteState.rejected) {
      throw new ForbiddenException('You already rejected invite.');
    }

    return this.prisma.memberInvite.update({
      where: { id: invite.id },
      data: { state: MemberInviteState.rejected },
    });
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

  async currentUserInvites({ email }: { email: string }) {
    const memberInvites = await this.prisma.memberInvite.findMany({
      where: {
        email,
        state: MemberInviteState.pending,
      },
      select: {
        id: true,
        email: true,
        role: true,
        state: true,
        projectId: true,
        project: true,
      },
    });

    return memberInvites.map((m) => ({
      id: m.id,
      projectId: m.projectId,
      projectName: m.project.name,
      email: m.email,
      role: m.role,
      state: m.state,
    }));
  }

  async updateMemberNotifications({
    projectId,
    memberId,
    permissions,
  }: {
    projectId: string;
    memberId: string;
    permissions: UpdateMemberNotificationsDto;
  }) {
    try {
      return await this.prisma.projectMember.update({
        where: {
          userId_projectId: {
            projectId,
            userId: memberId,
          },
        },
        data: {
          emailNotification: permissions.email,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Member not found');
      }
      throw new BadRequestException(error.message);
    }
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

    if (
      this.rolePriority[operator.role] < this.rolePriority[projectMember.role]
    ) {
      throw new BadRequestException('You are not allowed to update this role');
    }
    return { operator };
  }

  private rolePriority = {
    [ProjectMemberRole.member]: 0,
    [ProjectMemberRole.manager]: 1,
    [ProjectMemberRole.owner]: 2,
  };
}
