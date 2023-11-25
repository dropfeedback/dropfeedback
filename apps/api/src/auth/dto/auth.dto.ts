import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;
}
