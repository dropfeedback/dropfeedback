import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CursorPagination } from '../types';

export const GetCursorPagination = createParamDecorator(
  (data, ctx: ExecutionContext): CursorPagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const qursorFromQuery = req.query?.cursor as string | undefined;
    const takeFromQuery = req.query?.take as string | undefined;

    const pagination: CursorPagination = {
      // cursor can't be undefined or null because of prisma
      // so we need to check if it's undefined or null. If it is, we don't pass cursor field to object
      ...(qursorFromQuery && {
        cursor: {
          id: qursorFromQuery,
        },
      }),
      take: Number.isNaN(Number(takeFromQuery)) ? 25 : Number(takeFromQuery),
      // skip the first item because it's the last item from the previous page
      skip: qursorFromQuery ? 1 : 0,
    };

    return pagination;
  },
);
