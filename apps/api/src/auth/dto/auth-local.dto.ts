import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
