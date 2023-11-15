import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Feedbacks - e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /feedbacks', () => {
    it('should create feedback with valid data', async () => {
      //  get demo project
      const project = await app.get(PrismaService).project.findFirst();

      const response = await request(app.getHttpServer())
        .post('/feedbacks')
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
        .post('/feedbacks')
        .send({})
        .expect(500);

      await request(app.getHttpServer())
        .post('/feedbacks')
        .send({ content: '' })
        .expect(500);

      await request(app.getHttpServer())
        .post('/feedbacks')
        .send({ content: '12' })
        .expect(500);

      await request(app.getHttpServer())
        .post('/feedbacks')
        .send({ projectId: '' })
        .expect(500);

      await request(app.getHttpServer())
        .post('/feedbacks')
        .send({ projectId: '', content: '' })
        .expect(500);

      await request(app.getHttpServer())
        .post('/feedbacks')
        .send({ projectId: '12345', content: '' })
        .expect(500);
    });
  });
});
