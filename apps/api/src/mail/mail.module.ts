import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
