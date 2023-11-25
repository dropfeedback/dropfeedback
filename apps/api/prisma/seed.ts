import { faker } from '@faker-js/faker';
import {
  PrismaClient,
  ProjectMemberRole,
  UserProviderType,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const DEMO_USER = {
  email: 'demo@demo.com',
  password: 'demo',
  firstName: 'Demo',
  lastName: 'User',
  avatarUrl: 'https://i.pravatar.cc/150?img=13',
};

async function main() {
  console.log('🌱 Seeding prisma db...');

  const userDemo = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: {},
    create: {
      email: DEMO_USER.email,
      firstName: DEMO_USER.firstName,
      lastName: DEMO_USER.lastName,
      avatarUrl: DEMO_USER.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.Internal,
          hash: await bcrypt.hash(DEMO_USER.password, 10),
        },
      },
    },
  });

  const projectDemo = await prisma.project.create({
    data: {
      name: 'Demo Project',
      projectMembers: {
        create: {
          userId: userDemo.id,
          role: ProjectMemberRole.manager,
        },
      },
    },
  });

  for (let i = 1; i <= 120; i++) {
    const random = Math.floor(Math.random() * 5) + 1;
    // if random is equal to 2, add a metadata to the feedback
    const meta =
      random === 2
        ? // pick a random metadata from the mockMetaData array
          mockMetaData[Math.floor(Math.random() * mockMetaData.length)]
        : {};

    await prisma.feedback.create({
      data: {
        meta: meta,
        projectId: projectDemo.id,
        content: faker.lorem.paragraph({ min: 1, max: 3 }),
        device: faker.internet.userAgent(),
        origin: faker.internet.domainSuffix(),
      },
    });
  }
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

const mockMetaData = [
  {
    email: 'user1@email.com',
    target: 'footer',
    'app-version': '1.0.0',
  },
  {
    email: 'user2@email.com',
    target: 'footer',
    'app-version': '1.0.1',
  },
  {
    email: 'user3@email.com',
    target: 'footer',
    'app-version': '1.0.2',
  },
  {
    email: 'user4@email.com',
    target: 'footer',
    'app-version': '1.0.3',
  },
  {
    email: 'user5@email.com',
    target: 'footer',
    'app-version': '1.0.4',
  },
  {
    email: 'user6@email.com',
    target: 'footer',
    'app-version': '1.0.5',
  },
  {
    email: 'user7@email.com',
    target: 'footer',
    'app-version': '1.0.6',
  },
  {
    email: 'user8@email.com',
    target: 'footer',
    'app-version': '1.0.7',
  },
  {
    email: 'user9@email.com',
    target: 'footer',
    'app-version': '1.0.8',
  },
  {
    email: 'user10@email.com',
    target: 'footer',
    'app-version': '1.0.9',
  },
];
