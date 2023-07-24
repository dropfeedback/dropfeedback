import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UAParser from 'ua-parser-js';

export const Device = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const parser = new UAParser(request.headers['user-agent']);

  const hasDevice = parser.getBrowser()?.name || parser.getOS()?.name;
  if (!hasDevice) return parser.getUA();

  const device = `${parser.getBrowser().name} ${
    parser.getBrowser().version
  } on ${parser.getOS().name} ${parser.getOS().version}`;

  return device;
});
