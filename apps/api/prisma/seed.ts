import { PrismaClient, ProjectMemberRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
      projectMembers: {
        create: {
          userId: userDemo.id,
          role: ProjectMemberRole.manager,
        },
      },
    },
  });

  for (let i = 0; i < mockData?.length; i++) {
    const data = mockData[i];

    const random = Math.floor(Math.random() * 5) + 1;
    // if random is equal to 2, add a meta data to the feedback
    const meta =
      random === 2 ? { meta: { email: 'user@email.com', foo: 'bar' } } : {};

    await prisma.feedback.create({
      data: {
        ...data,
        ...meta,
        projectId: projectDemo.id,
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

const mockData = [
  {
    content:
      'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.',
    device: 'Mozilla 5.0 on Linux x86_64',
    origin: 'ft.com',
  },
  {
    content:
      'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.',
    device: 'Mozilla/5.0 on Windows 7',
    origin: 'java.com',
  },
  {
    content:
      'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.',
    device: 'Mozilla/5.0 on Windows NT 6.1',
    origin: 'wix.com',
  },
  {
    content:
      'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
    device: 'Chrome/14.0.824.0 on Macintosh',
    origin: 'wisc.edu',
  },
  {
    content:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    device: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko Firefox/11.0',
    origin: 'mozilla.org',
  },
  {
    content:
      'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.',
    device: 'Mozilla/5.0 on Windows 7',
    origin: 'businessweek.com',
  },
  {
    content:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    device: 'Mozilla/5.0 on Windows NT 6.1',
    origin: 'cpanel.net',
  },
  {
    content:
      'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.',
    device: 'Mozilla/5.0 on Windows NT 6.1',
    origin: 'goodreads.com',
  },
  {
    content:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    device: 'Mozilla/5.0 on ArchLinux',
    origin: 'discuz.net',
  },
  {
    content: 'Integer ac neque. Duis bibendum.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'parallels.com',
  },
  {
    content: 'Aenean lectus. Pellentesque eget nunc.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'arizona.edu',
  },
  {
    content:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'auda.org.au',
  },
  {
    content:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'storify.com',
  },
  {
    content:
      'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'gravatar.com',
  },
  {
    content:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'google.co.uk',
  },
  {
    content:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'paypal.com',
  },
  {
    content:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'issuu.com',
  },
  {
    content:
      'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'rambler.ru',
  },
  {
    content:
      'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'feedburner.com',
  },
  {
    content:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'jalbum.net',
  },
  {
    content:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'uiuc.edu',
  },
  {
    content:
      'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.',
    device: 'Arc 1.0 on Mac OS X 10_7',
    origin: 'princeton.edu',
  },
  {
    content:
      'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.',
    device: 'Chrome 140 on Windows 11',
    origin: 'yellowbook.com',
  },
  {
    content:
      'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    device: 'Chrome 140 on Windows 11',
    origin: 'angelfire.com',
  },
  {
    content:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    device: 'Chrome 140 on Windows 11',
    origin: 'bloglines.com',
  },
  {
    content:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.',
    device: 'Chrome 140 on Windows 11',
    origin: 'dion.ne.jp',
  },
  {
    content:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    device: 'Chrome 140 on Windows 11',
    origin: 'bbc.co.uk',
  },
  {
    content:
      'Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
    device: 'Chrome 140 on Windows 11',
    origin: 'opera.com',
  },
  {
    content:
      'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
    device: 'Chrome 140 on Windows 11',
    origin: 'fastcompany.com',
  },
  {
    content:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.',
    device: 'Chrome 140 on Windows 11',
    origin: 'digg.com',
  },
];
