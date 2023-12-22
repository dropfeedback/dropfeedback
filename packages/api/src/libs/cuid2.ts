import { init } from '@paralleldrive/cuid2';

type InitOptions<T> = T extends (args: infer U) => any ? U : never;

export const createId = (options?: InitOptions<typeof init>) => {
  const createId = init({
    length: 14,
    ...options,
  });

  return createId();
};
