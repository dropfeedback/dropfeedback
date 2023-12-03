import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectMemberRole } from '@prisma/client';
import { ProjectsService } from './projects.service';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { createNestApp } from 'src/test/helpers/create-nest-app';
import { getAuthCookie } from 'src/test/helpers/auth';

describe('Feedbacks - e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let projectsService: ProjectsService;
  let authCookie: string[] = [];

  beforeAll(async () => {
    app = await createNestApp();
    prisma = app.get(PrismaService);
    projectsService = app.get(ProjectsService);
    authCookie = await getAuthCookie(app, prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /projects', () => {
    it('should get projects', async () => {
      // create mock data and insert into db
      const [user1, user2, user3] = await Promise.all([
        prisma.user.upsert({
          update: {},
          create: {
            email: faker.internet.email(),
          },
          where: {
            email: faker.internet.email(),
          },
        }),
        prisma.user.upsert({
          update: {},
          create: {
            email: faker.internet.email(),
          },
          where: {
            email: faker.internet.email(),
          },
        }),
        prisma.user.upsert({
          update: {},
          create: {
            email: faker.internet.email(),
          },
          where: {
            email: faker.internet.email(),
          },
        }),
      ]);
      const [project1, project2] = await Promise.all([
        prisma.project.create({
          data: {
            name: 'test project',
            projectMembers: {
              create: {
                userId: user1.id,
                role: ProjectMemberRole.owner,
              },
            },
          },
        }),
        prisma.project.create({
          data: {
            name: 'test project',
            projectMembers: {
              create: {
                userId: user2.id,
                role: ProjectMemberRole.owner,
              },
            },
          },
        }),
      ]);
      await prisma.feedback.createMany({
        data: [
          {
            content: 'test content1',
            projectId: project1.id,
          },
          {
            content: 'test content2',
            projectId: project1.id,
          },
          {
            content: 'test content3',
            projectId: project2.id,
          },
        ],
      });

      const [projectsByUser1, projectsByUser2, projectsByUser3] =
        await Promise.all([
          projectsService.getAllByUser({ id: user1.id }),
          projectsService.getAllByUser({ id: user2.id }),
          projectsService.getAllByUser({ id: user3.id }),
        ]);

      expect(projectsByUser1).toEqual([
        {
          id: project1.id,
          name: project1.name,
          role: ProjectMemberRole.owner,
          createdAt: project1.createdAt,
          feedbackCount: 2,
        },
      ]);
      expect(projectsByUser2).toEqual([
        {
          id: project2.id,
          name: project2.name,
          role: ProjectMemberRole.owner,
          createdAt: project2.createdAt,
          feedbackCount: 1,
        },
      ]);
      expect(projectsByUser3).toEqual([]);
    });
  });

  describe('GET /projects/:projectId', () => {
    it('should get project', async () => {
      const project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      const projectById = await projectsService.getProjectById({
        projectId: project.id,
      });

      expect(projectById).toEqual({
        id: project.id,
        name: 'test project',
        createdAt: project.createdAt,
      });
    });

    it('should handle invalid params', async () => {
      await request(app.getHttpServer())
        .get('/projects/12345')
        .set('Cookie', authCookie)
        .expect(400);

      await request(app.getHttpServer())
        .get('/projects/b6ec9022-8d13-11ee-b9d1-0242ac120002')
        .set('Cookie', authCookie)
        .expect(404);
    });
  });

  describe('PATCH /projects/:projectId', () => {
    it('should update project', async () => {
      const project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      const updatedProject = await projectsService.updateProject({
        id: project.id,
        dto: {
          name: 'updated project',
        },
      });

      expect(updatedProject).toEqual({
        id: project.id,
        name: 'updated project',
        createdAt: project.createdAt,
      });
    });
  });

  describe('DELETE /projects/:projectId', () => {
    it('should delete project', async () => {
      const project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      await projectsService.deleteProject({
        id: project.id,
      });

      const projectShouldNotExist = await prisma.project.findUnique({
        where: {
          id: project.id,
        },
      });
      expect(projectShouldNotExist).toBeNull();
    });
  });
});
