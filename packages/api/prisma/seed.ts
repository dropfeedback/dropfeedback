import { faker } from '@faker-js/faker';
import {
  FeedbackType,
  PrismaClient,
  ProjectMemberRole,
  UserProviderType,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { addExtensions } from '../src/prisma/prisma.service';

const prisma = new PrismaClient();
addExtensions(prisma);

export const OWNER_USER = {
  email: 'owner@dropfeedback.com',
  password: 'owner',
  fullName: 'Owner User',
  avatarUrl: 'https://i.pravatar.cc/150?img=13',
};

export const OWNER_USER_2 = {
  email: 'owner2@dropfeedback.com',
  password: 'owner',
  fullName: 'Owner User 2',
  avatarUrl: 'https://i.pravatar.cc/150?img=8',
};

export const MANAGER_USER = {
  email: 'manager@dropfeedback.com',
  password: 'manager',
  fullName: 'Manager User',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
};

export const MANAGER_USER_2 = {
  email: 'manager2@dropfeedback.com',
  password: 'manager',
  fullName: 'Manager User 2',
  avatarUrl: 'https://i.pravatar.cc/150?img=9',
};

export const MEMBER_USER = {
  email: 'member@dropfeedback.com',
  password: 'member',
  fullName: 'Member User',
  avatarUrl: 'https://i.pravatar.cc/150?img=10',
};

export const MEMBER_USER_2 = {
  email: 'member2@dropfeedback.com',
  password: 'member',
  fullName: 'Member User 2',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
};

async function main() {
  console.log('🌱 Seeding prisma db...');

  const userOwner = await prisma.user.upsert({
    where: { email: OWNER_USER.email },
    update: {},
    create: {
      email: OWNER_USER.email,
      fullName: OWNER_USER.fullName,
      avatarUrl: OWNER_USER.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(OWNER_USER.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const userManager = await prisma.user.upsert({
    where: { email: MANAGER_USER.email },
    update: {},
    create: {
      email: MANAGER_USER.email,
      fullName: MANAGER_USER.fullName,
      avatarUrl: MANAGER_USER.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(MANAGER_USER.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const userMember = await prisma.user.upsert({
    where: { email: MEMBER_USER.email },
    update: {},
    create: {
      email: MEMBER_USER.email,
      fullName: MEMBER_USER.fullName,
      avatarUrl: MEMBER_USER.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(MEMBER_USER.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const userOwner2 = await prisma.user.upsert({
    where: { email: OWNER_USER_2.email },
    update: {},
    create: {
      email: OWNER_USER_2.email,
      fullName: OWNER_USER_2.fullName,
      avatarUrl: OWNER_USER_2.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(OWNER_USER_2.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const userManager2 = await prisma.user.upsert({
    where: { email: MANAGER_USER_2.email },
    update: {},
    create: {
      email: MANAGER_USER_2.email,
      fullName: MANAGER_USER_2.fullName,
      avatarUrl: MANAGER_USER_2.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(MANAGER_USER_2.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const userMember2 = await prisma.user.upsert({
    where: { email: MEMBER_USER_2.email },
    update: {},
    create: {
      email: MEMBER_USER_2.email,
      fullName: MEMBER_USER_2.fullName,
      avatarUrl: MEMBER_USER_2.avatarUrl,
      UserProvider: {
        create: {
          type: UserProviderType.internal,
          hash: await bcrypt.hash(MEMBER_USER_2.password, 10),
          emailVerified: true,
        },
      },
    },
  });

  const projectDemo = await prisma.project.create({
    data: {
      name: 'Demo Project',
      projectMembers: {
        createMany: {
          data: [
            {
              userId: userOwner.id,
              role: ProjectMemberRole.owner,
            },
            {
              userId: userManager.id,
              role: ProjectMemberRole.manager,
            },
            {
              userId: userMember.id,
              role: ProjectMemberRole.member,
            },
            {
              userId: userOwner2.id,
              role: ProjectMemberRole.owner,
            },
            {
              userId: userManager2.id,
              role: ProjectMemberRole.manager,
            },
            {
              userId: userMember2.id,
              role: ProjectMemberRole.member,
            },
          ],
        },
      },
    },
  });

  const getDateBetweenLastThreeDays = () => {
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
    const date = getDateBetweenLastThreeDays();
    const randomReporterId =
      Math.random() > 0.7 ? faker.internet.email() : null;
    const resolution = `${faker.number.int({
      min: 0,
      max: 1920,
    })}x${faker.number.int({
      min: 0,
      max: 1080,
    })}`;

    await prisma.feedback.create({
      data: {
        meta,
        category,
        projectId: projectDemo.id,
        status: i > 100 ? 'archived' : 'new',
        type: FeedbackType.category,
        content: faker.lorem.paragraph({ min: 1, max: 3 }),
        device: faker.internet.userAgent(),
        origin: faker.internet.domainSuffix(),
        createdAt: date,
        updatedAt: date,
        url: faker.internet.url(),
        reportIdentifier: randomReporterId,
        resolution,
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
