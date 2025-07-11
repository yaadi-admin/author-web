import { z } from 'zod';

export const advisorSchema = z.object({
  // summary
  // firstName: z.string().min(1, { message: 'First name is required' }),
  // lastName: z.string().min(1, { message: 'Last name is required' }),
  title: z.string().min(1, { message: 'Job Title is required' }),
  designation: z.string().optional(),
  // email: z.string().min(1, { message: 'E-mail is required' }),
  contact: z.string().optional(),
  fax: z.string().optional(),
  linkedin: z.string().optional(),
  calendar: z
    .string()
    .min(1, { message: 'Calendly or Calendar Link is required' }),
  companyLegalName: z
    .string()
    .min(1, { message: 'Company Legal name is required' }),
  dba: z.string().min(1, { message: 'This field is required' }),

  // business
  address: z.string().optional(),
  cob: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  postalCode: z.string().min(1, { message: 'This field is required' }),
  website: z.string().optional(),
  description: z
    .string()
    .min(1, { message: 'Company description is required' }),
  YIB: z.string().min(1, { message: 'Years in Business is required' }),
  employees: z.string().min(1, { message: 'Number of employees is required' }),
  Proposition1: z
    .string()
    .min(1, { message: 'Unique Proposition is required' }),
  Proposition2: z
    .string()
    .min(1, { message: 'Unique Proposition is required' }),
  Proposition3: z
    .string()
    .min(1, { message: 'Unique Proposition is required' }),
  category: z.string().min(1, { message: 'Primary Category is required' }),
  categories: z.array(z.string()).optional(),
  industries: z.array(z.string()).optional(),
  expertise: z.array(z.string()).optional(),

  logo: z.string().optional(),
  profilePictureURL: z.string().optional(),
  isFormVerified: z.boolean(),
});

export type AdvisorInput = z.infer<typeof advisorSchema>;
