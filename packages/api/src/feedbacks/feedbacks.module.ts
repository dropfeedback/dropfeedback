import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FeedbacksService, AccessTokenStrategy, PrismaService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
