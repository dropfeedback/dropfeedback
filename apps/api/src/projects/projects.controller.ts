import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { ProjectDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
