import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { config } from './config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';
import { ProjectsModule } from './projects/projects.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    ProjectsModule,
    FeedbacksModule,
    MailModule,
    UsersModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
