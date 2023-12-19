import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SendInviteEmailsBodyDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
