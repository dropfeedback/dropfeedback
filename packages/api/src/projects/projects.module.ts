import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProjectsService, AccessTokenStrategy, PrismaService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
