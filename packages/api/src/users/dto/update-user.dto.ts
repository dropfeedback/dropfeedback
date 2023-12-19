import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/prisma';

export class UpdateUserDto
  implements
    Omit<
      User,
      | 'id'
      | 'email'
      | 'avatarUrl'
      | 'updatedAt'
      | 'createdAt'
      | 'hashedRefreshToken'
    >
{
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
