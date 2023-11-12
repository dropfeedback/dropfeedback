import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { OrderBy } from '../types';

export const GetOderBy = createParamDecorator(
  (data, ctx: ExecutionContext): OrderBy => {
    const req: Request = ctx.switchToHttp().getRequest();

    const orderByFromQuery = req.query?.orderBy as
      | OrderBy['orderBy']
      | undefined;
    if (!orderByFromQuery) return {};

    try {
      return JSON.parse(orderByFromQuery);
    } catch (error) {
      return {};
    }
  },
);
