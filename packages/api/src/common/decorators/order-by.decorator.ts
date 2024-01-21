import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

import type { OrderBy } from '../types';

export const GetOderBy = createParamDecorator(
  (data, ctx: ExecutionContext): OrderBy => {
    const req: Request = ctx.switchToHttp().getRequest();

    const orderByFromQuery = req.query?.orderBy as OrderBy | undefined;

    if (!orderByFromQuery) return {};

    try {
      return orderByFromQuery;
    } catch (error) {
      return {};
    }
  },
  [
    (target, key) => {
      if (!key) return;

      // Here we will define query parameter for swagger documentation
      const explicit =
        Reflect.getMetadata(DECORATORS.API_PARAMETERS, target[key]) ?? [];
      Reflect.defineMetadata(
        DECORATORS.API_PARAMETERS,
        [
          ...explicit,
          {
            description: 'Order by',
            in: 'query',
            name: 'orderBy',
            required: false,
            type: 'string',
            enum: ['asc', 'desc'],
          },
        ],
        target[key],
      );
    },
  ],
);
