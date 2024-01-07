import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProviderType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me({
    userId,
    userProviderType,
  }: {
    userId: string;
    userProviderType: UserProviderType;
  }) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        include: {
          UserProvider: true,
          projectMember: true,
        },
      });

      // user can have multiple providers, but we only need the one that matches the current request (e.g. google or internal)
      const provider = user.UserProvider.find(function (provider) {
        return provider.type === userProviderType;
      });

      return {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        fullName: user.fullName,
        isEmailVerified: provider?.emailVerified,
        projects: user.projectMember.map((project) => ({
          id: project.projectId,
          role: project.role,
        })),
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error);
    }
  }

  async updateMe(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error);
    }
  }
}
