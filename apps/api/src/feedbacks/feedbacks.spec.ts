import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedbackDto } from './dto';
import { prismaMock } from 'src/libs/__mocks__/prisma';
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
      const feedbackDto: FeedbackDto = {
        content: 'test',
        projectId: 'be2f10bf-666f-4535-8a58-2c785ff00bb9',
        meta: {
          browser: 'test',
        },
      };

      prismaMock.feedback.create.mockResolvedValueOnce({
        id: 'test',
        device: 'test',
        origin: 'test',
        ...feedbackDto,
        createdAt: new Date(),
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
      });
    });
  });
});
