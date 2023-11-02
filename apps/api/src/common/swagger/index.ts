import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import metadata from 'src/metadata';

export const initSwagger = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('feedbacky')
    .setDescription('The feedbacky API')
    .setVersion('1.0')
    .addTag('feedbacky')
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
