import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import mockData from './MOCK_DATA.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding prisma db...');

  const userDemo = await prisma.user.upsert({
    where: { email: 'demo@demo.com' },
    update: {},
    create: {
      email: 'demo@demo.com',
      hash: await bcrypt.hash('123456', 10),
    },
  });

  const projectDemo = await prisma.project.create({
    data: {
      name: 'Demo Project',
      user: {
        connect: {
          id: userDemo.id,
        },
      },
    },
  });

  for (const data in mockData) {
    const random = Math.floor(Math.random() * 5) + 1;
    // if random is equal to 2, add a meta data to the feedback
    const meta =
      random === 2 ? { meta: { email: 'user@email.com', foo: 'bar' } } : {};

    await prisma.feedback.create({
      data: {
        ...mockData[data],
        ...meta,
        project: {
          connect: {
            id: projectDemo.id,
          },
        },
      },
    });
  }

  console.log('🚀 Seeding prisma db... done ');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
