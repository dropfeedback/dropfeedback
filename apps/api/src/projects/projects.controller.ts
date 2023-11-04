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
import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { ProjectDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { GetMembersDto } from './dto/get-members.dto';
import { AddMemberBodyDto } from './dto/add-member-body.dto';
import { AddMemberParamDto } from './dto/add-member-param.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get('/')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  getAllByUser(@GetCurrentUser() user: JwtPayload) {
    return this.projectService.getAllByUser({ id: user.sub });
  }

  @Post('/')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  createProject(@GetCurrentUser() user: JwtPayload, @Body() dto: ProjectDto) {
    return this.projectService.createProject({ userId: user.sub, dto });
  }

  @Get('/:projectId/members')
  @ApiBearerAuth('access-token')
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

  @Post('/:projectId/member')
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
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
}
