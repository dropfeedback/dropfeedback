import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';
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

  async createProject({ userId, dto }: { userId: string; dto: ProjectDto }) {
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

    if (memberInvite?.state === MemberInviteState.Pending) {
      throw new ConflictException('Invite already sent');
    }

    if (memberInvite?.state === MemberInviteState.Accepted) {
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
          data: { state: MemberInviteState.Pending },
        });
        await this.mailService.sendInviteEmail({
          email,
          projectName: memberInvite.project.name,
        });
        return HttpStatus.OK;
      }
    }

    // if user rejected invite, we will send invite again
    if (memberInvite?.state === MemberInviteState.Rejected) {
      await this.prisma.memberInvite.update({
        where: { id: memberInvite.id },
        data: { state: MemberInviteState.Pending },
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

    if (memberInvite?.state === MemberInviteState.Accepted) {
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
        data: { state: MemberInviteState.Accepted },
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

    if (invite.state === MemberInviteState.Accepted) {
      throw new ForbiddenException('You already accepted invite.');
    }

    if (invite.state === MemberInviteState.Rejected) {
      throw new ForbiddenException('You already rejected invite.');
    }

    return this.prisma.memberInvite.update({
      where: { id: invite.id },
      data: { state: MemberInviteState.Rejected },
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
        state: MemberInviteState.Pending,
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
