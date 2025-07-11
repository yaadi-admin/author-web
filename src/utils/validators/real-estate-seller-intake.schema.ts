import { z } from 'zod';


export const realEstateSellerIntakeSchema = z.object({
  // Profile Summary 
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  birthDate: z.date().refine((value) => value !== null, 'Birth Date is required'),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  preferredContactTimes: z.string().optional(),
  streetNumber: z.string().min(1, { message: 'Street Number is required' }),
  streetName: z.string().min(1, { message: 'Street Name is required' }),
  abbrev: z.string().min(1, { message: 'Abbreviation is required' }),
  postalCode: z.string().min(1, { message: 'Postal Code is required' }),
  frontingOn: z.enum(['East', 'North', 'South', 'West']),
  lotFront: z.string().min(1, { message: 'Lot Front is required' }),
  lotDepth: z.string().min(1, { message: 'Lot Depth is required' }),
  lotSizeCode: z.enum(['Feet', 'Metres', 'Acres']),
  directionMainCrossStreets: z.string().max(30).min(1, { message: 'Direction/Main Cross Streets is required' }),
  occupancy: z.enum(['Owner/Tenant', 'Owner', 'Partial', 'Tenant', 'Vacant']),
  taxes: z.string().optional(),
  taxYear: z.string().length(4).optional(),

  // Exterior
  propertyType: z.enum([
    'Attached/Row/Street Townhouse',
    'Cottage',
    'Detached',
    'Duplex',
    'Farm',
    'Fourplex',
    'Link',
    'Mobile/Trailer',
    'Multiplex',
    'Other',
    'Rural Residential',
    'Semi-Detached',
    'Store with Apt/Office',
    'Triplex',
    'Vacant Land'
  ]),
  style: z.enum([
    '1 1/2 Storey',
    '2 Storey',
    '2 1/2 Storey',
    '3 Storey',
    'Backsplit 3 Level',
    'Backsplit 4 Level',
    'Backsplit 5 Level',
    'Bungaloft',
    'Bungalow',
    'Bungalow - Raised',
    'Other',
    'Sidesplit 3 Level',
    'Sidesplit 4 Level',
    'Sidesplit 5 Level'
  ]),
  exterior: z.enum([
    'Aluminum Siding',
    'Board & Batten',
    'Brick',
    'Brick Front',
    'Concrete',
    'Insulbrick',
    'Log',
    'Metal/Steel Siding',
    'Other',
    'Shingle',
    'Stone',
    'Stucco (Plaster)',
    'Vinyl Siding',
    'Wood'
  ]).array(),
  garageType: z.enum([
    'Attached',
    'Built-In',
    'Carport',
    'Detached',
    'None',
    'Other'
  ]),
  garageParkingSpaces: z.string().min(1, { message: 'Garage Parking Spaces is required' }),
  parkingDrive: z.enum([
    'Available',
    'Circular',
    'Front Yard',
    'Lane',
    'Mutual',
    'None',
    'Other',
    'Private',
    'Private Double',
    'Right-of-Way'
  ]),
  driveParkingSpaces: z.string().min(1, { message: 'Drive Parking Spaces is required' }),
  totalParkingSpaces: z.string().min(1, { message: 'Total Parking Spaces is required' }),
  water: z.enum(['Both', 'Municipal', 'None', 'Other', 'Well']),
  pool: z.enum(['Above Ground', 'Indoor', 'Inground', 'None']),


  sewers: z.enum(['Holding Tank', 'None', 'Other', 'Septic', 'Sewer']),
  specialDesignation: z.enum([
    'Accessibility',
    'Expropriation',
    'Heritage',
    'Landlease',
    'Other',
    'Unknown'
  ]).array(),

  // TODO: Required if property type is Farm, Rural, Rural Residential, Vacant Land
  waterfront: z.enum(['Direct', 'Indirect', 'None']),
  isSewerSystemAvailable: z.enum(['Yes', 'No', 'Available']),
  cableTV: z.enum(['Yes', 'No', 'Available']),
  hydro: z.enum(['Yes', 'No', 'Available']),
  municipalWater: z.enum(['Yes', 'No', 'Available']),
  telephone: z.enum(['Yes', 'No', 'Available']),
  // END TODO 

  rooms: z.string().length(2).min(1, { message: 'Rooms is required' }),
  bedrooms: z.string().length(1).min(1, { message: 'Bedrooms is required' }),
  kitchens: z.string().length(1).min(1, { message: 'Kitchens is required' }),
  washrooms: z.string().min(1, { message: 'Washroom is required' }),
  familyRoom: z.enum(['Yes', 'No']),
  basement: z.enum([
    'Apartment',
    'Crawl Space',
    'Finished',
    'Finished with Walk-Out',
    'Full',
    'Half',
    'None',
    'Other',
    'Partial Basement',
    'Partially Finished',
    'Separate Entrance',
    'Unfinished',
    'Walk-Out',
    'Walk-Up'
  ]).array(),
  fireplaceStove: z.enum(['Yes', 'No']),
  heatSource: z.enum(['Electric', 'Gas', 'Ground Source', 'Oil', 'Other', 'Propane', 'Solar', 'Wood']),
  heatType: z.enum(['Baseboard', 'Fan Coil', 'Forced Air', 'Heat Pump', 'Other', 'Radiant', 'Water']),
  airConditioning: z.enum(['Central Air', 'None', 'Other', 'Wall Unit(s)', 'Window Unit(s)']),
  roomDetails: z.array(z.object({
    level: z.string().min(1, { message: 'Level is required' }),
    room: z.string().min(1, { message: 'Room is required' }),
    length: z.string().optional(),
    width: z.string().optional(),
    description: z.array(z.string()).min(3, 'Check at least 3' )
  })).optional(),
  isFormVerified: z.boolean(),
});



export type RealEstateSellerIntakeInput = z.infer<typeof realEstateSellerIntakeSchema>;
