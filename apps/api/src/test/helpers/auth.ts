import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const MOCK_USER = {
  email: 'teste2e@teste2e.com',
  password: 'teste2e',
  firstName: 'teste2e',
  lastName: 'teste2e',
};

export const signUp = async (app: INestApplication) => {
  return await request(app.getHttpServer())
    .post('/auth/local/signup')
    .send({
      ...MOCK_USER,
    });
};

export const signIn = async (app: INestApplication) => {
  // signin user
  return await request(app.getHttpServer()).post('/auth/local/signin').send({
    email: MOCK_USER.email,
    password: MOCK_USER.password,
  });
};

export const getAuthCookie = async (app: INestApplication) => {
  await signUp(app);
  const res = await signIn(app);
  return res.header['set-cookie'];
};
