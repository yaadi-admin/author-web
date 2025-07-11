import { z } from 'zod';

import { sellerObj as part1 } from "./seller-lite-intake.schema-part-1";
import { sellerObj as part2 } from "./seller-lite-intake.schema-part-2";





export const clientProfileSchema = z.object({
...part1,
...part2,
contractDate: z.date().nullable(),
expiryDate: z.date().nullable(),
cbCommission: z.string().optional(), 

occup: z.string().min(1, { message: 'This field is required' }), 
totalArea: z.string().min(1, { message: 'This field is required' }), 
officeAptArea: z.string().optional(), 
retailArea: z.string().optional(),
industrialArea: z.string().optional(),
basement: z.string().min(1, { message: 'This field is required' }),
washRooms: z.string().optional(),
water: z.string().min(1, { message: 'This field is required' }),
ac: z.string().min(1, { message: 'This field is required' }),
heat: z.string().min(1, { message: 'This field is required' }),
parkingGarage: z.string().min(1, { message: 'This field is required' }),
seats: z.string().min(1, { message: 'This field is required' }),
llbo: z.string().min(1, { message: 'This field is required' }),
zoning: z.string().min(1, { message: 'This field is required' }),
areaInfl: z.string().min(1, { message: 'This field is required' }),
remarks: z.string().optional(),
file1: z.string().min(1, { message: 'This field is required' }),
otherFiles: z.array(z.string()).optional(),
industrialOrCommercial: z.string().min(1, { message: 'This field is required' }),
freeStanding: z.string().optional(),
clearHeight: z.string().optional(),
sprinklers: z.string().optional(),
utilities: z.string().optional(),
shippingDoors: z.string().optional(),
elevators: z.string().optional(),
rail: z.string().optional(),
sewers: z.string().optional(),
needsSupportForPreparingSellingDocuments: z.string().min(1, { message: 'This field is required' }),
needsProfessionalAdvisorSupport: z.string().min(1, { message: 'This field is required' }),
wantToUseQualibuy: z.string().min(1, { message: 'This field is required' }),

isFormVerified: z.boolean(),
})

export type ClientProfileInput = z.infer<typeof clientProfileSchema>;

