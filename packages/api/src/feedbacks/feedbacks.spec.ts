import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto } from './dto';
import { prismaMock } from 'src/test/__mocks__/prisma';
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
        projectId: 'be2f10bf-666f-4535-8a58-2c785ff00bb9',
        meta: {
          browser: 'test',
        },
        category: 'other',
        status: 'new',
      };

      prismaMock.feedback.create.mockResolvedValueOnce({
        id: 'test',
        device: 'test',
        origin: 'test',
        ...feedbackDto,
        updatedAt: new Date(),
        createdAt: new Date(),
        category: 'other',
        status: 'new',
      });

      const result = await feedbackService.createByProjectId({
        dto: feedbackDto,
        device: 'test',
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
