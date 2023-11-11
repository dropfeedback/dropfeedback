import { IsString, IsNotEmpty } from 'class-validator';

export class AcceptInviteBodyDto {
  @IsNotEmpty()
  @IsString()
  acceptInviteToken: string;
}
