import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { OrderBy } from '../types';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

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
