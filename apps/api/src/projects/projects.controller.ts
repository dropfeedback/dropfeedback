import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { JwtPayload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { ProjectDto } from './dto';

import { DeleteMemberDto } from './dto/delete-member.dto';
import { GetMembersDto } from './dto/get-members.dto';
import { AddMemberBodyDto } from './dto/add-member-body.dto';
import { AddMemberParamDto } from './dto/add-member-param.dto';
import { GetInvitesDto } from './dto/get-invites.dto';
import { DeleteMemberInviteDto } from './dto/delete-member-invite-param.dto';

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
  createProject(@GetCurrentUser() user: JwtPayload, @Body() dto: ProjectDto) {
    return this.projectService.createProject({ userId: user.sub, dto });
  }

  @Get('/:projectId/members')
  @HttpCode(HttpStatus.OK)
  async getMembers(
    @GetCurrentUser() user: JwtPayload,
    @Param() dto: GetMembersDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: dto.projectId,
      userId: user.sub,
    });

    if (!hasAccess) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return this.projectService.members({ projectId: dto.projectId });
  }

  @Get('/:projectId/invites')
  @HttpCode(HttpStatus.OK)
  async getInvites(
    @GetCurrentUser() user: JwtPayload,
    @Param() dto: GetInvitesDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: dto.projectId,
      userId: user.sub,
    });

    if (!hasAccess) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return this.projectService.invites({ projectId: dto.projectId });
  }

  @Post('/:projectId/member')
  @HttpCode(HttpStatus.OK)
  async addMember(
    @GetCurrentUser() user: JwtPayload,
    @Param() paramDto: AddMemberParamDto,
    @Body() bodyDto: AddMemberBodyDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: paramDto.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    return this.projectService.addMember({
      projectId: paramDto.projectId,
      email: bodyDto.email,
      role: bodyDto.role,
    });
  }

  @Delete('/:projectId/member/:memberId')
  @HttpCode(HttpStatus.OK)
  async removeMember(
    @GetCurrentUser() user: JwtPayload,
    @Param() dto: DeleteMemberDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: dto.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    await this.projectService.removeMember({
      projectId: dto.projectId,
      operatorId: user.sub,
      memberId: dto.memberId,
    });
  }

  @Delete('/:projectId/invite/:memberId')
  @HttpCode(HttpStatus.OK)
  async cancelInvite(
    @GetCurrentUser() user: JwtPayload,
    @Param() dto: DeleteMemberInviteDto,
  ) {
    const hasAccess = await this.projectService.hasAccess({
      acceptedRoles: ['arkadaslar', 'owner', 'manager'],
      projectId: dto.projectId,
      userId: user.sub,
    });

    if (!hasAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    await this.projectService.cancelInvite(dto.memberInviteId);
  }
}
