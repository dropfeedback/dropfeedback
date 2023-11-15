import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProject, upsertUser } from 'src/test/helpers/crud';
import { ProjectMemberRole } from '@prisma/client';
import { ProjectsService } from './projects.service';
import { faker } from '@faker-js/faker';

describe('Feedbacks - e2e', () => {
  let app: INestApplication;
  let projectsService: ProjectsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    projectsService = moduleRef.get(ProjectsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /projects', () => {
    it('should get projects', async () => {
      const prisma = app.get(PrismaService);

      // create mock data and insert into db
      const [user1, user2, user3] = await Promise.all([
        upsertUser({ prisma, email: faker.internet.email() }),
        upsertUser({ prisma, email: faker.internet.email() }),
        upsertUser({ prisma, email: faker.internet.email() }),
      ]);
      const [project1, project2] = await Promise.all([
        createProject({
          prisma,
          userId: user1.id,
        }),
        createProject({
          prisma,
          userId: user2.id,
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
});
