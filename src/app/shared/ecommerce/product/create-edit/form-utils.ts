import { CreateProductInput } from '@/utils/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    title: product?.title ?? '',
    sku: product?.sku ?? '',
    type: product?.type ?? '',
    categories: product?.categories ?? '',
    description: product?.description ?? '',
    price: product?.price ?? undefined,
    costPrice: product?.costPrice ?? undefined,
    retailPrice: product?.retailPrice ?? undefined,
    salePrice: product?.salePrice ?? undefined,
    inventoryTracking: product?.inventoryTracking ?? '',
    currentStock: product?.currentStock ?? '',
    lowStock: product?.lowStock ?? '',
    productAvailability: product?.productAvailability ?? '',
    productImages: product?.productImages ?? undefined,
    tradeNumber: product?.tradeNumber ?? '',
    manufacturerNumber: product?.manufacturerNumber ?? '',
    brand: product?.brand ?? '',
    upcEan: product?.upcEan ?? '',
    customFields: isEmpty(product?.customFields)
      ? customFields
      : product?.customFields,

    freeShipping: product?.freeShipping ?? false,
    shippingPrice: product?.shippingPrice ?? undefined,
    locationBasedShipping: product?.locationBasedShipping ?? false,
    locationShipping: isEmpty(product?.locationShipping)
      ? locationShipping
      : product?.locationShipping,
    pageTitle: product?.pageTitle ?? '',
    metaDescription: product?.metaDescription ?? '',
    metaKeywords: product?.metaKeywords ?? '',
    productUrl: product?.productUrl ?? '',
    isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
    isLimitDate: product?.isLimitDate ?? false,
    dateFieldName: product?.dateFieldName ?? '',
    productVariants: isEmpty(product?.productVariants)
      ? productVariants
      : product?.productVariants,
    tags: product?.tags ?? [],
  };
}

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
export const typeOption = [
  {
    value: 'digital product',
    label: 'Digital Product',
  },
  {
    value: 'physical product',
    label: 'Physical Product',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];

// Propositions
export const propositions = [
  {
    value: 'Value for money',
    label: 'Value for money',
  },
  {
    value: 'Broad network',
    label: 'Broad network',
  },
  {
    value: 'Full service',
    label: 'Full service',
  },
  {
    value: 'Industry specialized',
    label: 'Industry specialized',
  },
  {
    value: 'Best in class',
    label: 'Best in class',
  },
  {
    value: 'Budget friendly',
    label: 'Budget friendly',
  },
  {
    value: 'Bespoke solutions',
    label: 'Bespoke solutions',
  }
];

// Category
export const category = [
  {
    value: 'Accounting Bookkeeping',
    label: 'Accounting/Bookkeeping',
  },
  {
    value: 'CBV Valuator',
    label: 'CBV/Valuator',
  },
  {
    value: 'Lawyer Legal Services',
    label: 'Lawyer/Legal Services',
  },
  {
    value: 'Tax Financial Estate Planner',
    label: 'Tax, Financial, & Estate Planner',
  },
  {
    value: 'M & Advisor',
    label: 'M&A Advisor',
  },
  {
    value: 'Marketing Media Production',
    label: 'Marketing & Media Production',
  },
  {
    value: 'Human Resources Transition Planning',
    label: 'Human Resources & Transition Planning',
  },
  {
    value: 'Business Strategy Operations Advisory',
    label: 'Business Strategy & Operations Advisory',
  },
  {
    value: 'Banking Finance And Insurance Provider',
    label: 'Banking, Finance, and Insurance Provider',
  },
  {
    value: 'Business Brokerage',
    label: 'Business Brokerage',
  },
  {
    value: 'Real Estate Brokerage',
    label: 'Real Estate Brokerage',
  }
];

// Provinces option
export const provinces = [{
  value: 'NL',
  label: 'Newfoundland and Labrador',
},
{
  value: 'PE',
  label: 'Prince Edward Island',
},
{
  value: 'NS',
  label: 'Nova Scotia',
},
{
  value: 'NB',
  label: 'New Brunswick',
},
{
  value: 'QB',
  label: 'Quebec',
},
{
  value: 'ON',
  label: 'Ontario',
},
{
  value: 'MB',
  label: 'Manitoba',
},
{
  value: 'SK',
  label: 'Saskatchewan',
},
{
  value: 'AB',
  label: 'Alberta',
},
{
  value: 'BC',
  label: 'British Columbia',
},
{
  value: 'YT',
  label: 'Yukon',
},
{
  value: 'NT',
  label: 'Northwest Territories',
},
{
  value: 'NU',
  label: 'Nunavut',
}];

// USA States option
export const usaStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

// Jamaican Parishes option
export const jamaicanParishes = [
  { value: 'Kingston', label: 'Kingston' },
  { value: 'Saint Andrew', label: 'Saint Andrew' },
  { value: 'Saint Thomas', label: 'Saint Thomas' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Saint Mary', label: 'Saint Mary' },
  { value: 'Saint Ann', label: 'Saint Ann' },
  { value: 'Trelawny', label: 'Trelawny' },
  { value: 'Saint James', label: 'Saint James' },
  { value: 'Hanover', label: 'Hanover' },
  { value: 'Westmoreland', label: 'Westmoreland' },
  { value: 'Saint Elizabeth', label: 'Saint Elizabeth' },
  { value: 'Manchester', label: 'Manchester' },
  { value: 'Clarendon', label: 'Clarendon' },
  { value: 'Saint Catherine', label: 'Saint Catherine' },
];

// Industry option
export const industry = [{
  value: "Retail",
  label: "Retail",
},
  {
    value: "Food and Hospitality",
    label: "Food and Hospitality",
  },
  {
    value: "Health and Wellness",
    label: "Health and Wellness",
  },
  {
    value: "Professional Services",
    label: "Professional Services",
  },
  {
    value: "Manufacturing",
    label: "Manufacturing",
  },
  {
    value: "Technology and Media",
    label: "Technology and Media",
  },
  {
    value: "Automotive and Transportation",
    label: "Automotive and Transportation",
  },
  {
    value: "Construction and Real Estate",
    label: "Construction and Real Estate",
  },
  {
    value: "Agriculture and Landscaping",
    label: "Agriculture and Landscaping",
  },
  {
    value: "Education and Training",
    label: "Education and Training",
  },
  {
    value: "Leisure and Entertainment",
    label: "Leisure and Entertainment",
  },
  {
    value: "Personal and Consumer Services",
    label: "Personal and Consumer Services",
  },
  {
    value: "Wholesale and Distribution",
    label: "Wholesale and Distribution",
  }];

export const typeOfSale = [{
  value: 'shares',
  label: 'Shares',
}, {
  value: 'assets',
  label: 'Assets',
}, {
  value: 'does not matter',
  label: `Doesn't Matter`,
}];

export const supportRequest = [{
  value: 'planning',
  label: 'Planning',
}, {
  value: 'valuation',
  label: 'Valuation',
}, {
  value: 'financial/accounting',
  label: 'Financial/Accounting',
}, {
  value: 'marketing',
  label: 'Marketing',
}, {
  value: 'deal support',
  label: 'Deal Support',
}, {
  value: 'legal',
  label: 'Legal',
}];

export const dealHorizon = [{
  value: '0-6',
  label: '0-6',
}, {
  value: '6-12',
  label: '6-12',
}, {
  value: '12-18',
  label: '12-18',
}, {
  value: '18-24+',
  label: '18-24+',
}];
