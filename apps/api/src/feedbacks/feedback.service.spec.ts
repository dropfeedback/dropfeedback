import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { AppModule } from '../app.module';
import { DEMO_PROJECT_ID } from '../../prisma/seed';

describe('FeedbacksService', () => {
  let service: FeedbacksService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get(FeedbacksService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('CRUD', () => {
    it('should create feedback', async () => {
      const feedback = await service.createByProjectId({
        dto: {
          meta: null,
          projectId: DEMO_PROJECT_ID,
          content: 'test feedback',
        },
        device: 'test device',
        origin: 'test origin',
      });

      expect(feedback).toBeTruthy();
    });

    it('should fetch data by projectId', async () => {
      // Seed specific test data

      const response = await service.getAllByProjectId({
        projectId: DEMO_PROJECT_ID,
        pagination: {
          take: 30,
        },
      });

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('total');
      expect(response).toHaveProperty('nextCursor');
      expect(response).toHaveProperty('prevCursor');
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should filter results based on search criteria', async () => {
      const response = await service.getAllByProjectId({
        projectId: DEMO_PROJECT_ID,
        search: 'searchQuery',
        pagination: {
          take: 30,
        },
      });

      expect(
        response.data.every((item) => item.content.includes('habitasse')),
      ).toBeTruthy();
    });

    it('should handle pagination correctly', async () => {
      const pageSize = 10;

      // Fetch the first page
      const firstPageResponse = await service.getAllByProjectId({
        projectId: DEMO_PROJECT_ID,
        pagination: {
          take: pageSize,
        },
      });

      // Assertions for the first page
      expect(firstPageResponse.data.length).toBeLessThanOrEqual(pageSize);

      // Fetch the next page using the cursor from the first page
      const secondPageCursor = firstPageResponse.nextCursor;
      const secondPageResponse = await service.getAllByProjectId({
        projectId: DEMO_PROJECT_ID,
        pagination: {
          take: pageSize,
          cursor: {
            id: secondPageCursor,
          },
        },
      });

      // Check if the first item of the second page is different from the last item of the first page
      expect(secondPageResponse.data[0].id).not.toBe(
        firstPageResponse.data[firstPageResponse.data.length - 1].id,
      );

      // Fetch the previous page using the cursor from the second page
      const prevPageCursor = secondPageResponse.prevCursor;
      const prevPageResponse = await service.getAllByProjectId({
        projectId: DEMO_PROJECT_ID,
        pagination: {
          take: -pageSize,
          cursor: {
            id: prevPageCursor,
          },
        },
      });

      // Check if the first item of the previous page is the same as the last item of the first page
      expect(prevPageResponse.data[0].id).toBe(
        firstPageResponse.data[firstPageResponse.data.length - 1].id,
      );
    });
  });
});
