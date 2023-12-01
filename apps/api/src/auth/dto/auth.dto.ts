import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInLocalDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpLocalDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  fullName: string;
}
