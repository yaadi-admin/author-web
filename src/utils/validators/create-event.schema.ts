import { z } from 'zod';
import { messages } from '@/config/messages';

export const eventFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Meeting title is required' }),
  description: z.string().min(1, { message: 'Meeting description is required' }),
  location: z.string().min(1, { message: 'Meeting location is required' }),
  virtual: z.string().optional(),
  startDate: z.date({
    required_error: messages.startDateIsRequired,
  }),
  // startTime: z.date({
  //   required_error: messages.startTimeIsRequired,
  // }),
  endDate: z.date({
    required_error: messages.endDateIsRequired,
  }),
  // endTime: z.date({
  //   required_error: messages.endTimeIsRequired,
  // }),
});

// generate form types from zod validation schema
export type EventFormInput = z.infer<typeof eventFormSchema>;
