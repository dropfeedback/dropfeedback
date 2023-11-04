import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AcceptInviteBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  acceptInviteToken: string;
}
