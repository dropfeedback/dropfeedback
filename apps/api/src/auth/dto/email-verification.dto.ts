import { IsNotEmpty, IsString } from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty()
  @IsString()
  emailVerificationToken: string;
}
