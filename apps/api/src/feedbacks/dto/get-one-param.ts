import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Feedback } from 'src/prisma';

export class GetOneParam
  implements
    Omit<
      Feedback,
      | 'createdAt'
      | 'userId'
      | 'device'
      | 'origin'
      | 'content'
      | 'meta'
      | 'category'
      | 'projectId'
      | 'status'
      | 'id'
    >
{
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  feedbackId: string;
}
