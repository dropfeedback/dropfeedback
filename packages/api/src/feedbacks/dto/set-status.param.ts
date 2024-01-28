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
      | 'status'
      | 'id'
      | 'resolution'
      | 'reportIdentifier'
      | 'url'
      | 'type'
    >
{
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  feedbackId: string;
}
