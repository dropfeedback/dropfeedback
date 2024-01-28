import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaMock } from 'src/test/__mocks__/prisma';
import { FeedbackType } from '@prisma/client';

import { CreateFeedbackDto } from './dto';
import { FeedbacksService } from './feedbacks.service';
import { AppModule } from '../app.module';

// // example of mocking PrismaService
describe('Feedbacks', () => {
  let feedbackService: FeedbacksService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    feedbackService = moduleRef.get<FeedbacksService>(FeedbacksService);
  });

  describe('CRUD', () => {
    it('should create feedback with valid data', async () => {
      const feedbackDto: CreateFeedbackDto = {
        content: 'test',
        meta: {
          browser: 'test',
        },
        category: 'other',
        status: 'new',
        url: 'test',
        reportIdentifier: 'test',
        resolution: 'test',
      };

      prismaMock.feedback.create.mockResolvedValueOnce({
        id: 'test',
        device: 'test',
        origin: 'test',
        ...feedbackDto,
        updatedAt: new Date(),
        createdAt: new Date(),
        category: 'other',
        projectId: 'be2f10bf-666f-4535-8a58-2c785ff00bb9',
        status: 'new',
        type: FeedbackType.category,
      });

      const result = await feedbackService.createByProjectId({
        dto: feedbackDto,
        device: 'test',
        projectId: 'be2f10bf-666f-4535-8a58-2c785ff00bb9',
        origin: 'test',
      });

      expect(result).toEqual({
        id: 'test',
        device: 'test',
        origin: 'test',
        ...feedbackDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
