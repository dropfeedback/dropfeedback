import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idToken: string;
}
