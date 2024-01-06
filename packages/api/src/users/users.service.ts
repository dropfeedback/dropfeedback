import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me(id: string) {
    try {
      const userWithProjectMembers = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          UserProvider: true,
          projectMember: true,
        },
      });

      const user = {
        id: userWithProjectMembers.id,
        email: userWithProjectMembers.email,
        avatarUrl: userWithProjectMembers.avatarUrl,
        fullName: userWithProjectMembers.fullName,
      };

      const isEmailVerified = userWithProjectMembers.UserProvider.some(
        (provider) => provider.emailVerified,
      );

      return {
        ...user,
        isEmailVerified,
        projects: userWithProjectMembers.projectMember.map((project) => ({
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
