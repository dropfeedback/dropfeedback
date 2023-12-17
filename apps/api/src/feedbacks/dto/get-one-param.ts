import { IsNotEmpty, IsString } from 'class-validator';
import { Feedback } from 'src/prisma';

export class GetOneParam
  implements
    Omit<
      Feedback,
      | 'createdAt'
      | 'updatedAt'
      | 'userId'
      | 'device'
      | 'origin'
      | 'content'
      | 'meta'
      | 'category'
      | 'projectId'
      | 'status'
      | 'id'
      | 'resolution'
      | 'reportIdentifier'
    >
{
  @IsNotEmpty()
  @IsString()
  feedbackId: string;
}
