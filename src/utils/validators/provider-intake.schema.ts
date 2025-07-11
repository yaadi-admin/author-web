import { z } from 'zod';

export const providerIntakeSchema = z.object({
  // summary
  representative: z
    .string()
    .min(1, { message: 'This field is required' })
    .regex(/^Yes$/i, {
      message:
        'You must be an authorized representative for the business to create a profile',
    }),
  primary: z.string().min(1, { message: 'This field is required' }),
  // firstName: z.string().min(1, { message: 'First name is required' }),
  // lastName: z.string().min(1, { message: 'Last name is required' }),
  title: z.string().min(1, { message: 'Job Title is required' }),
  designation: z.string().optional(),
  // email: z.string().min(1, { message: 'E-mail is required' }),
  contact: z.string().min(1, { message: 'Phone number is required' }),
  linkedin: z.string().optional(),
  companyLegalName: z
    .string()
    .min(1, { message: 'Company Legal name is required' }),
  dba: z.string().optional(),

  // business
  cob: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
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

  logo: z.string().min(1, { message: 'Logo is required' }),
  profilePictureURL: z
    .string()
    .min(1, { message: 'Profile Picture is required' }),
  intakeForm: z.string().optional(),
  isFormVerified: z.boolean(),
});

export type ProviderIntakeInput = z.infer<typeof providerIntakeSchema>;
