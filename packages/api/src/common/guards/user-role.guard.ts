// user-role.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

import { Roles } from '../decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      // We need Roles decorator to be defined before using this guard
      throw new UnprocessableEntityException('Roles decorator is missing');
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    if (!request.query.projectId && !request.params.projectId) {
      throw new BadRequestException('projectId should not be empty');
    }

    const user = await this.prismaService.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: request.user.sub,
          projectId: request.query.projectId || request.params.projectId,
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User is not a member of this project');
    }

    if (!roles.includes(user.role)) {
      throw new UnauthorizedException('User does not have the required role');
    }

    return true;
  }
}
