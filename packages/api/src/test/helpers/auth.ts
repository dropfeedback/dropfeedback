import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import * as bcrypt from 'bcrypt';

export const MOCK_USER = {
  email: 'teste2e@teste2e.com',
  password: 'teste2e',
  fullName: 'teste2e',
};

export const signIn = async (app: INestApplication) => {
  // signin user
  return await request(app.getHttpServer()).post('/auth/local/signin').send({
    email: MOCK_USER.email,
    password: MOCK_USER.password,
  });
};

export const getAuthCookie = async (
  app: INestApplication,
  prisma: PrismaClient,
) => {
  // create mock user
  await prisma.user.upsert({
    where: { email: MOCK_USER.email },
    update: {},
    create: {
      email: MOCK_USER.email,
      fullName: MOCK_USER.fullName,
      UserProvider: {
        create: {
          type: 'internal',
          emailVerified: true,
          hash: await bcrypt.hash(MOCK_USER.password, 10),
        },
      },
    },
  });

  const res = await signIn(app);
  return res.header['set-cookie'];
};
