import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailService } from './mail.service';

@Module({
  imports: [JwtModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
