import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService, ConfigService],
})
export class MailModule {}
