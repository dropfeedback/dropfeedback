import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import cookieParser from 'cookie-parser';

export const createNestApp = async () => {
  // create app instance
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleRef.createNestApplication();
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.init();

  return app;
};
