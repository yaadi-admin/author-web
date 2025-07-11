import { z } from 'zod';

export const buyerIntakeSchema = z.object({
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  linkedInProfile: z.string().optional(),
  memberOfEthnicityGroup: z.boolean().optional(),
  sex: z.string().optional(),
  gender: z.string().optional(),
  lgbtq: z.string().optional(),
  pwd: z.string().optional(),
  ethnicity: z.string().optional(),
  veteranMilitary: z.string().optional(),
  type: z.string({ required_error: 'Individual/Representation is required' })
    .min(1, { message: 'Individual/Representation is required' }),
  baseCity: z.string().min(1, { message: 'City is required' }),
  baseProvince: z.string().min(1, { message: 'Province is required' }),
  budget: z.string().optional(),
  quickBuyWindow: z.string({ required_error: 'Buy Horizon is required' })
    .min(1, { message: 'Buy Horizon is required' }),
  citizenship: z.string().min(1, { message: 'Citizenship is required' }),
  purchaseFinance: z.string({ required_error: 'Purchase Finance is required' })
    .min(1, { message: 'Purchase Finance is required' }),
  cashAvailabilityCheck: z.string().optional(),
  typeOfDeal: z.string({ required_error: 'Type of Deal is required' })
    .min(1, { message: 'Type of Deal is required' }),
  yearsOfExperience: z.string().optional(),
  hoursToCommit: z.string({ required_error: 'Hours to commit is required' })
    .min(1, { message: 'Hours to commit is required' }),
  physicallyAccessible: z.string({ required_error: 'Physically accessible is required' })
    .min(1, { message: 'Physically accessible is required' }),
  employeeImportance: z.string({ required_error: 'Employee importance is required' })
    .min(1, { message: 'Employee importance is required' }),
  leadershipStyle: z.string({ required_error: 'Leadership Style is required' })
    .min(1, { message: 'Leadership is required' }),
  innovateMeter: z.string({ required_error: 'Innovate meter is required' })
    .min(1, { message: 'Innovate meter is required' }),
  keepMePosted: z.string({ required_error: 'Keep me posted is required' })
    .min(1, { message: 'Keep me posted is required' }),
  businessCategories: z.array(z.string()).optional(),
  profilePicture: z.string().optional(),
  sectors: z.array(z.string()).optional(),
  resume: z.string().optional(),
  proofOfFunds: z.string().optional(),
  creditReport: z.string().optional(),
  isFormVerified: z.boolean(),
})

export type BuyerIntakeInput = z.infer<typeof buyerIntakeSchema>;
