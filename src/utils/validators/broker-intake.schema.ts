import { z } from 'zod';

export const brokerIntakeSchema = z.object({
  legalRepresentative: z.string().min(1, { message: 'This field is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'E-mail is required' }),
  contact: z.string().optional(),
  companyName: z.string().min(1, { message: 'This field is required' }),  
  contractDate:z.date(),
  expiryDate:z.date(),
  cbCommission: z.string().min(1, { message: 'This field is required' }), 
  
  spis: z.string().min(1, { message: 'This field is required' }), 
  dom: z.string().min(1, { message: 'This field is required' }), 
  occup: z.string().min(1, { message: 'This field is required' }), 
  totalArea: z.string().min(1, { message: 'This field is required' }), 
  officeAptArea: z.string().min(1, { message: 'This field is required' }),
  retailArea: z.string().min(1, { message: 'This field is required' }),
  industrialArea: z.string().min(1, { message: 'This field is required' }),
  basement: z.string().min(1, { message: 'This field is required' }),
  water: z.string().min(1, { message: 'This field is required' }),
  ac: z.string().min(1, { message: 'This field is required' }),
  heat: z.string().min(1, { message: 'This field is required' }),
  parkingGarage: z.string().min(1, { message: 'This field is required' }),
  seats: z.string().min(1, { message: 'This field is required' }),
  llbo: z.string().min(1, { message: 'This field is required' }),
  zoning: z.string().min(1, { message: 'This field is required' }),
  areaInfl: z.string().min(1, { message: 'This field is required' }),
  remarks: z.string().min(1, { message: 'This field is required' }),
  file1: z.string().min(1, { message: 'This field is required' }),
  file2: z.string().optional(),
  file3: z.string().optional(),
  isFormVerified: z.boolean(),
})

export type BrokerIntakeInput = z.infer<typeof brokerIntakeSchema>;
