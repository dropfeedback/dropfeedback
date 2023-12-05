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
  fullName: 'Demo User',
  avatarUrl: 'https://i.pravatar.cc/150?img=13',
};

async function main() {
  console.log('🌱 Seeding prisma db...');

  const userDemo = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: {},
    create: {
      email: DEMO_USER.email,
      fullName: DEMO_USER.fullName,
      avatarUrl: DEMO_USER.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
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

  const createDateBetweenLastThreeDays = () => {
    const now = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);
    return faker.date.between({ from: threeDaysAgo, to: now });
  };

  for (let i = 1; i <= 120; i++) {
    const randomMeta = Math.floor(Math.random() * 5) + 1;
    // if random is equal to 2, add a metadata to the feedback
    const meta =
      randomMeta === 2
        ? // pick a random metadata from the mockMetaData array
          mockMetaData[Math.floor(Math.random() * mockMetaData.length)]
        : {};

    const randomCategory = Math.floor(Math.random() * 3) + 1;
    const category =
      randomCategory === 1 ? 'idea' : randomCategory === 2 ? 'issue' : 'other';

    await prisma.feedback.create({
      data: {
        meta,
        category,
        projectId: projectDemo.id,
        status: i > 100 ? 'archived' : 'new',
        content: faker.lorem.paragraph({ min: 1, max: 3 }),
        device: faker.internet.userAgent(),
        origin: faker.internet.domainSuffix(),
        createdAt: createDateBetweenLastThreeDays(),
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
