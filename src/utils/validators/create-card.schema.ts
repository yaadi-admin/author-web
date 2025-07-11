import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createRoleSchema = z.object({
  title: z
    .string(),
  details: z
    .string(),
  // roleColor: z
  //   .object({
  //     r: z.number(),
  //     g: z.number(),
  //     b: z.number(),
  //     a: z.number(),
  //   })
    // .optional(),
});

// generate form types from zod validation schema
export type CreateCardInput = z.infer<typeof createRoleSchema>;
