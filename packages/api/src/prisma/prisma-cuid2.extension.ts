import { createId } from '../libs/cuid2';

// https://github.com/prisma/prisma/issues/17102
// prisma uses `cuid` for id generation, but it's not secure.
// so we use `cuid2` instead.
export const prismaExtensionCuid2 = {
  query: {
    $allModels: {
      async create({ args, query }) {
        args.data.id = createId();

        return query(args);
      },
      async createMany({ args, query }) {
        if (Array.isArray(args.data)) {
          args.data.map((model) => (model.id = createId()));
        } else {
          args.data.id = createId();
        }

        return query(args);
      },
      async upsert({ args, query }) {
        args.create.id = createId();

        return query(args);
      },
    },
  },
};
