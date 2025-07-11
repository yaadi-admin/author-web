import { z } from 'zod';
export const sellerObj = {
  staffHeadCount: z.string().optional(),
  operatingHours: z.string().optional(),
  monthlyRentOrPropertyTax: z.string().optional(),
  inventoryValue: z.string().optional(),
  ffe: z.string().optional(),
  isTurnKey: z.string().min(1, { message: 'This field is required' }),
  managementContinue: z.string().min(1, { message: 'This field is required' }),
  // offerFinancing: z.string().min(1, { message: 'This field is required' }),
  // downPaymentRequiredPrice: z.string().min(1, { message: 'This field is required' }),
  
};
export const sellerIntakeSchema = z.object({...sellerObj, 
  isFormVerified: z.boolean(),
})

export type SellerIntakeInput = z.infer<typeof sellerIntakeSchema>;
