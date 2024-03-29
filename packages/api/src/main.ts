import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { initSwagger } from './swagger/init-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port || 8080);
  Logger.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
