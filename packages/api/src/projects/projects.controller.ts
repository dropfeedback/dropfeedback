import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { JwtPayload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { InviteMemberParam } from './dto/invite-member.param';
import { GetInvitesParam } from './param/get-invites.param';
import { DeleteMemberInviteParam } from './param/delete-member-invite.param';
import { AcceptInviteParam } from './param/accept-invite.param';
import { RejectInviteParam } from './param/reject-invite.param';
import { UpdateProjectParam } from './param/update-project.param';
import { DeleteProjectParam } from './param/delete-project.param';
import { GetProjectById } from './param/get-project-by-id.param';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetTeamParam } from './param/get-team.param';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAllByUser(@GetCurrentUser() user: JwtPayload) {
    return this.projectService.getAllByUser({ id: user.sub });
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createProject(
    @GetCurrentUser() user: JwtPayload,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.createProject({ userId: user.sub, dto });
  }

  @Get('/current-user-invites')
  @HttpCode(HttpStatus.OK)
  async getCurrentUserInvites(@GetCurrentUser() user: JwtPayload) {
    return this.projectService.currentUserInvites({
      email: user.email,
    });
  }

  @Get('/:projectId')
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Param() param: GetProjectById) {
    return this.projectService.getProjectById({ projectId: param.projectId });
  }

  @Patch('/:projectId')
  @HttpCode(HttpStatus.OK)
  updateProject(
    @Body() dto: UpdateProjectDto,
    @Param() param: UpdateProjectParam,
  ) {
    return this.projectService.updateProject({ id: param.projectId, dto });
  }

  @Delete('/:projectId')
  @HttpCode(HttpStatus.OK)
  deleteProject(@Param() param: DeleteProjectParam) {
    return this.projectService.deleteProject({ id: param.projectId });
  }

  @Post('/:projectId/invite')
  @HttpCode(HttpStatus.OK)
  async inviteMember(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: InviteMemberParam,
    @Body() dto: InviteMemberDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: param.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    return this.projectService.inviteMember({
      projectId: param.projectId,
      email: dto.email,
      role: dto.role,
    });
  }

  @Get('/:projectId/team')
  @HttpCode(HttpStatus.OK)
  async getTeam(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: GetTeamParam,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager', 'member'],
      projectId: param.projectId,
      userId: user.sub,
    });

    if (!hasAccess) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return this.projectService.getTeam({ projectId: param.projectId });
  }

  @Get('/:projectId/invites')
  @HttpCode(HttpStatus.OK)
  async getInvites(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: GetInvitesParam,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager', 'member'],
      projectId: param.projectId,
      userId: user.sub,
    });

    if (!hasAccess) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return this.projectService.invites({ projectId: param.projectId });
  }

  @Post('/:projectId/accept-invite')
  @HttpCode(HttpStatus.OK)
  async acceptInvite(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: AcceptInviteParam,
  ) {
    return this.projectService.acceptInvite({
      projectId: param.projectId,
      userId: user.sub,
      email: user.email,
    });
  }

  @Post('/:projectId/reject-invite')
  @HttpCode(HttpStatus.OK)
  async rejectInvite(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: RejectInviteParam,
  ) {
    return this.projectService.rejectInvite({
      projectId: param.projectId,
      email: user.email,
    });
  }

  @Delete('/:projectId/member/:memberId')
  @HttpCode(HttpStatus.OK)
  async removeMember(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: DeleteMemberDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: param.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    await this.projectService.removeMember({
      projectId: param.projectId,
      operatorId: user.sub,
      memberId: param.memberId,
    });
  }

  @Delete('/:projectId/invite/:memberInviteId')
  @HttpCode(HttpStatus.OK)
  async cancelInvite(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: DeleteMemberInviteParam,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: param.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    await this.projectService.cancelInvite(param.memberInviteId);
  }
}
