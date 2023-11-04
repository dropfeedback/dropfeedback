import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { clearPostgres } from 'src/test/helpers/clear-db';
import { AuthService } from 'src/auth/auth.service';
import { decode } from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/types';
import { ProjectMemberRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: '',
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get(ProjectsService);
    authService = moduleRef.get(AuthService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('CRUD', () => {
    beforeAll(async () => {
      await clearPostgres();

      // create user for tests
      const tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
      });
      // get user id from access token
      const { sub } = decode(tokens.accessToken) as JwtPayload;
      // set user id for tests
      user.id = sub;
    });

    it('should create project and return with role', async () => {
      const projectName = faker.lorem.words(2);

      const createdProject = await service.createProject({
        userId: user.id,
        dto: { name: projectName },
      });

      expect(createdProject).toBeTruthy();
      expect(createdProject.id).toBeTruthy();
      expect(createdProject.name).toBe(projectName);

      const projects = await service.getAllByUser({ id: user.id });
      const project = projects.find((p) => p.id === createdProject.id);
      expect(project).toBeTruthy();

      expect(project.name).toContain(projectName);
      expect(project.role).toBe(ProjectMemberRole.owner);
    });
  });
});
