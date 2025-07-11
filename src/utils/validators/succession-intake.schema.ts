import { z } from 'zod';
// Required Fields
// All Except Phone #, Website, Business Registration #, Within How many Months Would you Be Prepared to Exit, Advisors, Profile Photo are all optional.

export const successionIntakeSchema = z.object({
  legalRepresentative: z.string().min(1, { message: 'This field is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'E-mail is required' }),
  contact: z.string().optional(),

  companyName: z.string().min(1, { message: 'This field is required' }),
  dba: z.string().min(1, { message: 'This field is required' }),
  legalStructure: z.string().min(1, { message: 'This field is required' }),
  jurisdiction: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'This field is required' }),

  industry: z.string().min(1, { message: 'This field is required' }),
  subCategory: z
    .array(z.string())
    .min(1, { message: 'This field is required' }),
  website: z.string().optional(),

  registrationNumber: z.string().optional(),
  yearIncorporated: z.string().min(1, { message: 'This field is required' }),
  profilePicture: z.string().optional(),
  currentOwner: z.string().min(1, { message: 'This field is required' }),
  isOtherOwnersInvolved: z
    .string()
    .min(1, { message: 'This field is required' }),
  otherOwners: z
    .array(
      z
        .object({
          ownerName: z.string().optional(),
          percentage: z.string().optional(),
          email: z.string().optional(),
        })
        .superRefine((data, ctx) => {
          if (data.ownerName && !data.email) {
            ctx.addIssue({
              code: 'custom',
              path: ['email'],
              message: 'Email is required if name is provided',
            });
          }
        })
    )
    .optional(),
  organizationalChart: z
    .array(
      z
        .object({
          name: z.string().optional(),
          position: z.string().optional(),
          email: z.string().optional(),
        })
        .superRefine((data, ctx) => {
          if (data.name && !data.email) {
            ctx.addIssue({
              code: 'custom',
              path: ['email'],
              message: 'Email is required if name is provided',
            });
          }
        })
    )
    .optional(),

  exitBusinessMonths: z.string().optional(),
  exitRetirementTarget: z
    .string()
    .min(1, { message: 'This field is required' }),
  estimatedValueOfAllBusinessAssets: z.string().optional(),
  priorYearEBITDA: z.string().optional(),
  priorYearSalesRevenue: z
    .string()
    .min(1, { message: 'This field is required' }),

  logo: z.string().optional(),

  advisors: z
    .array(
      z
        .object({
          position: z.string().optional(),
          name: z.string().optional(),
          companyName: z.string().optional(),
          email: z.string().optional(),
          phoneNumber: z.string().optional(),
        })
        .superRefine((data, ctx) => {
          if (data.name && !data.email) {
            ctx.addIssue({
              code: 'custom',
              path: ['email'],
              message: 'Email is required if name is provided',
            });
          }
        })
    )
    .optional(),

  isFormVerified: z.boolean(),
});

export type SuccessionInput = z.infer<typeof successionIntakeSchema>;
