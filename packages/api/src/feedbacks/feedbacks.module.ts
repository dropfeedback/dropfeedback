import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    FeedbacksService,
    AccessTokenStrategy,
    PrismaService,
    MailService,
  ],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
