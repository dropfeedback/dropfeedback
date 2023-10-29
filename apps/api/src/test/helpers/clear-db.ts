import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tables = Prisma.dmmf.datamodel.models
  .map((model) => model.dbName)
  .filter((table) => table);

export const clearPostgres = async () => {
  await prisma.$transaction([
    ...tables.map((table) =>
      prisma.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`),
    ),
  ]);
};
