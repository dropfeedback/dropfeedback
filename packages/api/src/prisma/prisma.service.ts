import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import { prismaExtensionCuid2 } from './prisma-cuid2.extension';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL');

    super({
      log: ['error', 'info', 'warn'],
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    addExtensions(this);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// nestjs doesn't support prisma extension yet.
// so we use this hack to add the extension.
// issue: https://github.com/prisma/prisma/issues/18628#issuecomment-1806598075
export const addExtensions = (prisma: PrismaClient) => {
  Object.assign(prisma, prisma.$extends(prismaExtensionCuid2));
  return prisma;
};
