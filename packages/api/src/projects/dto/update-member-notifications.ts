import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateMemberNotificationsDto {
  @IsNotEmpty()
  @IsBoolean()
  email: boolean;
}
