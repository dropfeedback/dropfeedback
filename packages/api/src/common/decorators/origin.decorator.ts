import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Origin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers['origin'] || request.headers['referer'];
});
