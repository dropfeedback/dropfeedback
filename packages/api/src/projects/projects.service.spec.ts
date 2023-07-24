import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { clearPostgres } from 'src/test/helpers/clear-db';
import { AuthService } from 'src/auth/auth.service';
import { decode } from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/types';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  const user = {
    email: 'project-service@gmail.com',
    password: 'super-secret-password',
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

    it('should create project', async () => {
      const projectName = 'test project';

      const project = await service.createProject({
        userId: user.id,
        dto: { name: projectName },
      });

      expect(project).toBeTruthy();
      expect(project.id).toBeTruthy();
      expect(project.name).toBe(projectName);

      const projects = await service.getAllByUser({ id: user.id });
      const projectNames = projects.map((project) => project.name);
      expect(projectNames).toContain(projectName);
    });

    it('should throw error when name is not unique ', async () => {
      const projectName = 'duplicated project';

      await service.createProject({
        userId: user.id,
        dto: { name: projectName },
      });

      try {
        await service.createProject({
          userId: user.id,
          dto: { name: projectName },
        });
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });
});
