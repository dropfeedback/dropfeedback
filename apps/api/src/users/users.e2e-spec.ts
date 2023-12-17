import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MOCK_USER, getAuthCookie } from 'src/test/helpers/auth';
import { createNestApp } from 'src/test/helpers/create-nest-app';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Users - e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authCookie: string[] = [];

  beforeAll(async () => {
    app = await createNestApp();
    prisma = await app.get(PrismaService);
    authCookie = await getAuthCookie(app, prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users/me', () => {
    it('should return user data', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/me')
        .set('Cookie', authCookie)
        .expect(200);

      expect(body).toMatchObject({
        id: expect.any(String),
        email: MOCK_USER.email,
        fullName: MOCK_USER.fullName,
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });

    it('should update user data', async () => {
      const { body } = await request(app.getHttpServer())
        .patch('/users/me')
        .set('Cookie', authCookie)
        .send({
          fullName: 'updated name',
        })
        .expect(200);

      expect(body).toMatchObject({
        id: expect.any(String),
        email: MOCK_USER.email,
        fullName: 'updated name',
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      await request(app.getHttpServer()).patch('/users/me').expect(401);
    });
  });
});
