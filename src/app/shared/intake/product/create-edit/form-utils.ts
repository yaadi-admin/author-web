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

// Industry option
export const industry = [{
  value: 'Agriculture & Forestry',
  label: 'Agriculture & Forestry',
}, {
  value: 'Construction & Infrastructure',
  label: 'Construction & Infrastructure',
}, {
  value: 'Education',
  label: 'Education',
}, {
  value: 'Arts & Culture',
  label: 'Arts & Culture',
}, {
  value: 'Energy & Utilities',
  label: 'Energy & Utilities',
}, {
  value: 'Finance',
  label: 'Finance',
}, {
  value: 'Banking & Insurance',
  label: 'Banking & Insurance',
}, {
  value: 'Government & Public Administration',
  label: 'Government & Public Administration',
}, {
  value: 'Hospitality',
  label: 'Hospitality',
}, {
  value: 'Hotels & Food Services',
  label: 'Hotels & Food Services',
}, {
  value: 'Manufacturing',
  label: 'Manufacturing',
}, {
  value: 'Mining',
  label: 'Mining',
}, {
  value: 'Oil & Gas',
  label: 'Oil & Gas',
}, {
  value: 'Professional Services (Tax, Accounting, Legal, Consulting)',
  label: 'Professional Services (Tax, Accounting, Legal, Consulting)',
}, {
  value: 'Real Estate',
  label: 'Real Estate',
}, {
  value: 'Transportation & Logistics',
  label: 'Transportation & Logistics',
}, {
  value: 'Retail & Consumer Products',
  label: 'Retail & Consumer Products',
}, {
  value: 'IT & Tech',
  label: 'IT & Tech',
}, {
  value: 'Healthcare',
  label: 'Healthcare',
}, {
  value: 'Other',
  label: 'Other',
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

// export const  = [{
//   value: '',
//   label: '',
// }, {
//   value: '',
//   label: '',
// }];
