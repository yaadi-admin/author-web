import { industries, industriesMapping } from "@/data/forms/form-utils";
export type InitialStateType = {
  search: string;
  price: number[] | string;
  primary_sector: string[] | string;
  advanced_primary_sector: string,
  isMyFavorites: boolean;
  for_sale: string
};

export const initialState: InitialStateType = {
  search: '',
  price: [0, 0],
  primary_sector: [],
  advanced_primary_sector: 'Retail',
  isMyFavorites: false,
  for_sale: ''
};

// Options
export const sectorTypes = industries.map((industry, index) => {
  return ({
    id: index + 1,
    name: industry,
    value: industry,
    selected: false
  }) 
})

export const advancedPrimarySectorOptions = industries.map((industry, index) => ({
  label: industry,
  value: industry,
}));

export const secondarySectorOptions = (value: string) => {
  return industriesMapping[value].map((industry) => ({name: industry, value: industry}));
}


export const forsaleData = [
  {
    id: 1,
    label: 'For Sale',
    value: 'for-sale',
  },
  {
    id: 2,
    label: 'For Rent',
    value: 'for-rent',
  },
  {
    id: 3,
    label: 'Sold',
    value: 'sold',
  },
];



export const amenitiesOptions = [
  {
    name: 'Must Have AC',
    value: 'must-have-ac',
  },
  {
    name: 'Must Have Pool',
    value: 'must-have-pool',
  },
  {
    name: 'Warfront',
    value: 'warfront',
  },
];

export const viewOptions = [
  {
    name: 'City',
    value: 'city',
  },
  {
    name: 'Mountain',
    value: 'mountain',
  },
  {
    name: 'Park',
    value: 'park',
  },
  {
    name: 'Water',
    value: 'water',
  },
];

export const tourOptions = [
  {
    name: 'Must Have Open House',
    value: 'have_open_house',
  },
  {
    name: 'Must Have 3D Tour',
    value: 'have_3d_tour',
  },
];

export const parkingSpotsData = [
  { label: 'Any', value: 'any' },
  { label: '1+', value: '1+' },
  { label: '2+', value: '2+' },
  { label: '3+', value: '3+' },
  { label: '4+', value: '4+' },
  { label: '5+', value: '5+' },
];

export const squareFeetOptions = [
  { label: '500 Sqft', value: '500' },
  { label: '750 Sqft', value: '750' },
  { label: '1000 Sqft', value: '1000' },
  { label: '1250 Sqft', value: '1250' },
  { label: '1500 Sqft', value: '1500' },
  { label: '1750 Sqft', value: '1750' },
  { label: '2000 Sqft', value: '2000' },
  { label: '2250 Sqft', value: '2250' },
];

export const lotSizeOptions = [
  { label: '500 Sqft', value: '500' },
  { label: '750 Sqft', value: '750' },
  { label: '1000 Sqft', value: '1000' },
  { label: '1250 Sqft', value: '1250' },
  { label: '1500 Sqft', value: '1500' },
  { label: '1750 Sqft', value: '1750' },
  { label: '2000 Sqft', value: '2000' },
  { label: '2250 Sqft', value: '2250' },
];

export const soldInLastOptions = [
  { label: 'Any', value: 'any' },
  { label: '1 day', value: '1_day' },
  { label: '7 days', value: '7_days' },
  { label: '14 days', value: '14_days' },
  { label: '30 days', value: '30_days' },
  { label: '90 days', value: '90_days' },
  { label: '6 months', value: '6 months' },
  { label: '1 year', value: '1 year' },
];

export const noMinimumData = [
  { label: '$0', value: 0 },
  { label: '$10000', value: 10000 },
  { label: '$20000', value: 20000 },
  { label: '$30000', value: 30000 },
  { label: '$40000', value: 40000 },
  { label: '$50000', value: 50000 },
];

export const noMaximumData = [
  { label: '$0', value: 0 },
  { label: '$100000', value: 100000 },
  { label: '$200000', value: 200000 },
  { label: '$300000', value: 300000 },
  { label: '$400000', value: 400000 },
  { label: '$500000', value: 500000 },
];
