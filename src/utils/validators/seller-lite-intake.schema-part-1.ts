import { z } from 'zod';

export const sellerObj = {
  legalRepresentative: z.string().min(1, { message: 'This field is required' }),
  contact: z.string().optional(),
  contactHours: z.string().min(1, { message: 'This field is required' }),
  companyName: z.string().min(1, { message: 'This field is required' }),
  dba: z.string().min(1, { message: 'This field is required' }),
  country: z.string().min(1, { message: 'This field is required' }),
  unitNumber: z.string().optional(),
  streetNumber: z.string().min(1, { message: 'This field is required' }),
  streetName: z.string().min(1, { message: 'This field is required' }),
  province: z.string().min(1, { message: 'This field is required' }),
  city: z.string().min(1, { message: 'This field is required' }),
  postalCode: z.string().min(1, { message: 'This field is required' }),
  neighborhood: z.string().optional(),
  industry: z.string().min(1, { message: 'This field is required' }),
  subCategory: z.array(z.string()).min(1, { message: 'This field is required' }),
  website: z.string().optional(),
  yearEstablished: z.string().min(1, { message: 'This field is required' }),
  annualRevenue: z.string().min(1, { message: 'This field is required' }),
  annualCashflow: z.string().optional(),
  ebitda: z.string().optional(),
  hasLegalDocumentsReady: z.string().min(1, { message: 'This field is required' }),
  isFranchise: z.string().min(1, { message: 'This field is required' }),
  askingPrice: z.string().min(1, { message: 'This field is required' }),
  thirdPartyValuation: z.string().min(1, { message: 'This field is required' }),
  brokerNotes: z.string().optional(),
};

export const sellerIntakeSchema = z.object({
  ...sellerObj,
  isFormVerified: z.boolean(),
});

export type SellerIntakeInput = z.infer<typeof sellerIntakeSchema>;
