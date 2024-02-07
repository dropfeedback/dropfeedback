import { Reflector } from '@nestjs/core';
import { ProjectMemberRole } from '@prisma/client';

export const Roles = Reflector.createDecorator<ProjectMemberRole[]>();
