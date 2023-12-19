import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import metadata from './metadata';

export const initSwagger = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('dropfeedback')
    .setDescription('The dropfeedback API')
    .setVersion('1.0')
    .addTag('dropfeedback')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer "JWT"`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
