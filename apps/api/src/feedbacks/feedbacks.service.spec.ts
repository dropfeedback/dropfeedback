import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { ProjectsService } from 'src/projects/projects.service';
import { AuthService } from 'src/auth/auth.service';
import { AppModule } from 'src/app.module';
import { clearPostgres } from 'src/test/helpers/clear-db';
import { JwtPayload, decode } from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

describe('FeedbacksService', () => {
  let service: FeedbacksService;
  let projectsService: ProjectsService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: '',
  };

  let project = {
    id: '',
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get(FeedbacksService);
    projectsService = moduleRef.get(ProjectsService);
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

      // create project for tests
      project = await projectsService.createProject({
        userId: user.id,
        dto: { name: 'test for feedback' },
      });
    });

    it('should create feedback', async () => {
      const feedback = await service.createByProjectId({
        dto: {
          meta: null,
          projectId: project.id,
          content: 'test feedback',
        },
        device: 'test device',
        origin: 'test origin',
      });

      expect(feedback).toBeTruthy();
    });

    it('should get all feedbacks by project id', async () => {
      await service.createByProjectId({
        dto: {
          meta: null,
          projectId: project.id,
          content: 'test feedback',
        },
        device: 'test device',
        origin: 'test origin',
      });

      const feedbacks = await service.getAllByProjectId({
        projectId: project.id,
        userId: user.id,
      });

      expect(feedbacks).toBeTruthy();
      expect(feedbacks.length).toBeGreaterThan(1);
    });
  });
});
