import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedbackType, Project } from '@prisma/client';
import request from 'supertest';
import { createNestApp } from 'src/test/helpers/create-nest-app';
import { getAuthCookie } from 'src/test/helpers/auth';

describe('Feedbacks - e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authCookie: string = '';

  beforeAll(async () => {
    app = await createNestApp();
    prisma = await app.get(PrismaService);
    authCookie = await getAuthCookie(app, prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /feedbacks', async () => {
    let project: Project | null = null;

    beforeAll(async () => {
      // create mock project
      project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      // create mock feedbacks
      await prisma.feedback.createMany({
        data: [
          {
            content: 'archived other',
            projectId: project?.id,
            status: 'archived',
            type: FeedbackType.category,
            category: 'other',
          },
          {
            content: 'new other',
            projectId: project?.id,
            status: 'new',
            type: FeedbackType.category,
            category: 'other',
          },
          {
            content: 'new issue',
            projectId: project?.id,
            status: 'new',
            type: FeedbackType.category,
            category: 'issue',
          },
          {
            content: 'new idea',
            projectId: project?.id,
            status: 'new',
            type: FeedbackType.category,
            category: 'idea',
          },
        ],
      });
    });

    it('should get feedbacks', async () => {
      const response = await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id })
        .set('Cookie', authCookie);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        data: expect.any(Array),
        countAll: 4,
        countCurrent: 4,
        countArchived: 1,
        countIdea: 1,
        countIssue: 1,
        countNew: 3,
        countOther: 1,
      });
    });

    it('should count depends to search param', async () => {
      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, search: 'other' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toMatchObject({
            data: expect.any(Array),
            countAll: 4,
            countCurrent: 2,
            countArchived: 1,
            countNew: 1,
            countIdea: 0,
            countIssue: 0,
            countOther: 1,
          });
        });

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, search: 'idea' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toMatchObject({
            data: expect.any(Array),
            countAll: 4,
            countCurrent: 1,
            countArchived: 0,
            countNew: 1,
            countIdea: 1,
            countIssue: 0,
            countOther: 0,
          });
        });
    });

    it('should data filter by params', async () => {
      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, category: 'issue' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.data).length(1);
          expect(response.body).toMatchObject({
            countAll: 4,
            countCurrent: 1,
            countArchived: 1,
            countIdea: 1,
            countIssue: 1,
            countNew: 3,
            countOther: 1,
          });
        });

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, category: 'idea' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.data).length(1);
          expect(response.body).toMatchObject({
            countAll: 4,
            countCurrent: 1,
            countArchived: 1,
            countIdea: 1,
            countIssue: 1,
            countNew: 3,
            countOther: 1,
          });
        });

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, category: 'other' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.data).length(2);
          expect(response.body).toMatchObject({
            countAll: 4,
            countCurrent: 2,
            countArchived: 1,
            countIdea: 1,
            countIssue: 1,
            countNew: 3,
            countOther: 1,
          });
        });

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, status: 'new' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.data).length(3);
          expect(response.body).toMatchObject({
            countAll: 4,
            countCurrent: 3,
            countArchived: 1,
            countIdea: 1,
            countIssue: 1,
            countNew: 3,
            countOther: 1,
          });
        });

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: project?.id, status: 'archived' })
        .set('Cookie', authCookie)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.data).length(1);
        });
    });

    it('should handle invalid params', async () => {
      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: '12345' })
        .set('Cookie', authCookie)
        .expect(404);

      await request(app.getHttpServer())
        .get(`projects/${project?.id}/feedbacks`)
        .query({ projectId: '' })
        .set('Cookie', authCookie)
        .expect(400);
    });
  });

  describe('GET :projectId/feedbacks/:feedbackId', () => {
    it('should get feedback by id', async () => {
      // create mock project
      const project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      // create mock feedback
      const feedback = await prisma.feedback.create({
        data: {
          content: 'test content',
          projectId: project?.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/projects/${project.id}/feedbacks/${feedback?.id}`)
        .set('Cookie', authCookie);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        id: feedback?.id,
        content: 'test content',
        createdAt: expect.any(String),
        category: 'other',
        status: 'new',
        origin: null,
        meta: null,
        device: null,
        projectId: project?.id,
      });
    });

    it('should handle invalid params', async () => {
      await request(app.getHttpServer())
        .get(`projects/12345/feedbacks/12345`)
        .set('Cookie', authCookie)
        .expect(404);

      await request(app.getHttpServer())
        .get('projects/12345/feedbacks/')
        .set('Cookie', authCookie)
        .expect(400);

      await request(app.getHttpServer())
        .get('projects/12345/feedbacks/b6ec9022-8d13-11ee-b9d1-0242ac120002')
        .set('Cookie', authCookie)
        .expect(404);
    });
  });

  describe('POST projects/:projectId/feedbacks', () => {
    it('should create feedback with valid data', async () => {
      // create mock project
      const project = await prisma.project.create({
        data: {
          name: 'test project',
        },
      });

      // create feedback
      const response = await request(app.getHttpServer())
        .post(`/projects/${project.id}/feedbacks`)
        .send({
          content: 'test content',
          projectId: project?.id,
        });

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        content: 'test content',
        project: {
          id: project?.id,
        },
      });
    });

    it('invalid dto', async () => {
      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ projectId: '2114' });
      expect(400);

      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ content: '' })
        .expect(400);

      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ content: '12' })
        .expect(400);

      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ projectId: '' })
        .expect(400);

      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ projectId: '', content: '' })
        .expect(400);

      await request(app.getHttpServer())
        .post('projects/12345/feedbacks')
        .send({ projectId: '12345', content: '' })
        .expect(400);
    });
  });
});
