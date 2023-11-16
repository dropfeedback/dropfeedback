import { ProjectMemberRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export const upsertUser = async ({
  prisma,
  email,
}: {
  prisma: PrismaService;
  email: string;
}) => {
  const user = await prisma.user.upsert({
    update: {},
    create: {
      email,
    },
    where: {
      email,
    },
  });

  return user;
};

export const createProject = async ({
  prisma,
  role = ProjectMemberRole.owner,
  name = 'test project',
  userId,
}: {
  prisma: PrismaService;
  userId: string;
  name?: string;
  role?: ProjectMemberRole;
}) => {
  const project = await prisma.project.create({
    data: {
      name,
      projectMembers: {
        create: {
          userId,
          role: role,
        },
      },
    },
  });

  return project;
};

export const createFeedback = async ({
  prisma,
  projectId,
  content,
}: {
  prisma: PrismaService;
  projectId: string;
  content: string;
}) => {
  const feedback = await prisma.feedback.create({
    data: {
      content,
      projectId,
    },
  });

  return feedback;
};
