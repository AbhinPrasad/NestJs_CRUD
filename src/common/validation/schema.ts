import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    job: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createUserSchema>;
