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
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, Roles } from 'src/common/decorators';
import { UserRoleGuard } from 'src/common/guards';

import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  DeleteMemberDto,
  InviteMemberDto,
  UpdateMemberNotificationsDto,
  UpdateMemberRoleDto,
  UpdateProjectDto,
} from './dto';
import {
  AcceptInviteParam,
  DeleteMemberInviteParam,
  DeleteProjectParam,
  GetInvitesParam,
  GetProjectByIdParam,
  GetTeamParam,
  InviteMemberParam,
  LeaveProjectParam,
  RejectInviteParam,
  UpdateMemberNotificationsParam,
  UpdateMemberRoleParam,
  UpdateProjectParam,
} from './param';

import type { JwtPayload } from 'src/auth/types';

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
  getCurrentUserInvites(@GetCurrentUser() user: JwtPayload) {
    return this.projectService.currentUserInvites({
      email: user.email,
    });
  }

  @Get('/:projectId')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  getProjectById(@Param() param: GetProjectByIdParam) {
    return this.projectService.getProjectById({
      projectId: param.projectId,
    });
  }

  @Patch('/:projectId')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  updateProject(
    @Body() dto: UpdateProjectDto,
    @Param() param: UpdateProjectParam,
  ) {
    return this.projectService.updateProject({
      id: param.projectId,
      dto,
    });
  }

  @Delete('/:projectId')
  @Roles(['owner'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  deleteProject(@Param() param: DeleteProjectParam) {
    return this.projectService.deleteProject({
      id: param.projectId,
    });
  }

  @Post('/:projectId/invite')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  inviteMember(
    @Param() param: InviteMemberParam,
    @Body() dto: InviteMemberDto,
  ) {
    return this.projectService.inviteMember({
      projectId: param.projectId,
      email: dto.email,
      role: dto.role,
    });
  }

  @Get('/:projectId/team')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  getTeam(@Param() param: GetTeamParam) {
    return this.projectService.getTeam({ projectId: param.projectId });
  }

  @Get('/:projectId/invites')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  getInvites(@Param() param: GetInvitesParam) {
    return this.projectService.invites({ projectId: param.projectId });
  }

  @Post('/:projectId/accept-invite')
  @Roles(['owner', 'manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  acceptInvite(
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
  rejectInvite(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: RejectInviteParam,
  ) {
    return this.projectService.rejectInvite({
      projectId: param.projectId,
      email: user.email,
    });
  }

  @Patch('/:projectId/member/:memberId')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  async updateMemberRole(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: UpdateMemberRoleParam,
    @Body() body: UpdateMemberRoleDto,
  ) {
    if (user.sub === param.memberId)
      throw new ForbiddenException('You cannot change your own role');

    await this.projectService.updateMemberRole({
      projectId: param.projectId,
      operatorId: user.sub,
      memberId: param.memberId,
      newRole: body.role,
    });
  }

  @Delete('/:projectId/member/:memberId')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  async removeMember(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: DeleteMemberDto,
  ) {
    await this.projectService.removeMember({
      projectId: param.projectId,
      operatorId: user.sub,
      memberId: param.memberId,
    });
  }

  @Delete('/:projectId/leave-project')
  // owner cant leave project
  @Roles(['manager', 'member'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  async leaveProject(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: LeaveProjectParam,
  ) {
    await this.projectService.leaveProject({
      projectId: param.projectId,
      memberId: user.sub,
    });
  }

  @Delete('/:projectId/invite/:memberInviteId')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  async cancelInvite(@Param() param: DeleteMemberInviteParam) {
    await this.projectService.cancelInvite(param.memberInviteId);
  }

  @Patch('/:projectId/member/:memberId/notifications')
  @Roles(['owner', 'manager'])
  @UseGuards(UserRoleGuard)
  @HttpCode(HttpStatus.OK)
  async updateMemberNotifications(
    @GetCurrentUser() user: JwtPayload,
    @Param() param: UpdateMemberNotificationsParam,
    @Body() body: UpdateMemberNotificationsDto,
  ) {
    // user cant update other members notifications
    if (user.sub !== param.memberId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    await this.projectService.updateMemberNotifications({
      projectId: param.projectId,
      memberId: param.memberId,
      permissions: body,
    });
  }
}
