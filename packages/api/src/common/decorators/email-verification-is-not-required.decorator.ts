import { SetMetadata } from '@nestjs/common';

export const EmailVerificationIsNotRequired = () =>
  SetMetadata('emailVerificationIsNotRequired', true);
