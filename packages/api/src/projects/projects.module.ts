import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [ProjectsService, AccessTokenStrategy, PrismaService, MailService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
