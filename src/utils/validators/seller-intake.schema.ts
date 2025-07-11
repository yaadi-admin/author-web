import { z } from 'zod';

export const sellerIntakeSchema = z.object({
  legalRepresentative: z.string().min(1, { message: 'This field is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'E-mail is required' }),
  contact: z.string().optional(),
  companyName: z.string().min(1, { message: 'This field is required' }),  
  dba:z.string().optional(),
  legalStructure: z.string().min(1, { message: 'This field is required' }),  
  jurisdiction: z.string().min(1, { message: 'This field is required' }),  
  cob: z.string().min(1, { message: 'This field is required' }), 
  province: z.string().min(1, { message: 'This field is required' }), 
  neighborhood: z.string().optional(), 
  industry: z.string().min(1, { message: 'This field is required' }), 
  subCategory: z.array(z.string()).min(1, { message: 'This field is required' }), 
  website: z.string().optional(), 
  yearEstablished: z.string().min(1, { message: 'This field is required' }), 
  annualRevenue: z.string().min(1, { message: 'This field is required' }), 
  annualCashflow: z.string().min(1, { message: 'This field is required' }), 
  hasAccountant: z.string().min(1, { message: 'This field is required' }), 
  administrativeReadiness: z.string().min(1, { message: 'This field is required' }), 
  franchise: z.string().min(1, { message: 'This field is required' }), 
  typeOfSale: z.string().min(1, { message: 'This field is required' }), 
  intendedBuyer: z.string().min(1, { message: 'This field is required' }), 
  exitReason: z.string().min(1, { message: 'This field is required' }), 
  valuationReadiness: z.string().optional(), 
  lawyer: z.string().min(1, { message: 'This field is required' }), 
  
  planningSupport: z.boolean().optional(),
  valuationSupport: z.boolean().optional(),
  financialSupport: z.boolean().optional(),
  marketingSupport: z.boolean().optional(),
  dealSupport: z.boolean().optional(),
  legalSupport: z.boolean().optional(),

  otherKeyDecisionMakers: z.string().min(1, { message: 'This field is required' }), 
  dealHorizon: z.string().min(1, { message: 'This field is required' }), 

  logo: z.string().min(1, { message: 'This field is required' }), 
  profilePictureURL: z.string().optional(), 

  isFormVerified: z.boolean(),
})

export type SellerIntakeInput = z.infer<typeof sellerIntakeSchema>;
