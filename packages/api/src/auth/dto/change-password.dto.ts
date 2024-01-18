import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  passwordResetToken: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
