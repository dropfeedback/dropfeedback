import { IsNotEmpty, IsString } from 'class-validator';
import { Feedback } from 'src/prisma';

export class SetStatusParam
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
      | 'url'
    >
{
  @IsNotEmpty()
  @IsString()
  feedbackId: string;
}
