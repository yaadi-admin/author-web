export const industriesMapping: { [key: string]: string[] }  = {
  "Retail": [
    "Clothing and Accessories",
    "Electronics and Appliances",
    "Furniture and Home Furnishings",
    "Health and Personal Care Stores (Pharmacies, Beauty Supplies)",
    "Specialty Stores (Pet Shops, Book Stores, Toy Shops)",
    "Food and Beverage Retail (Grocers, Liquor Stores, Convenience Stores)",
    "Other",
  ],
  "Food and Hospitality": [
    "Restaurants (American, Asian, European, Specialty)",
    "Cafes and Coffee Shops",
    "Fast Food and Takeaways",
    "Bars and Pubs",
    "Catering Services",
    "Hotels and Motels",
    "Travel and Tourism Services (Travel Agencies, Tour Operators)",
    "Other",
  ],
  "Health and Wellness": [
    "Long Term Care Facilities",
    "Home Care",
    "Medical and Dental Practices",
    "Fitness Centers and Gyms",
    "Spas and Beauty Salons",
    "Alternative Health Services (Chiropractors, Massage Therapy)",
    "Veterinary Clinics",
    "Other",
  ],
  "Professional Services": [
    "Legal and Accounting Services",
    "Consulting and Business Services",
    "Employment Agencies",
    "Marketing and Advertising Agencies",
    "Real Estate Agencies and Property Management",
    "Engineering and Technical Services",
    "Other",
  ],
  "Manufacturing": [
    "Food and Beverage Production",
    "Machinery and Equipment",
    "Metal and Wood Products",
    "Chemical and Pharmaceutical Products",
    "Textiles and Apparel",
    "Other",
  ],
  "Technology and Media": [
    "IT and Software Services",
    "E-commerce Businesses",
    "Digital Media and Publishing",
    "Telecommunication Services",
    "Other",
  ],
  "Automotive and Transportation": [
    "Auto Repair and Service Shops",
    "Car Dealerships",
    "Trucking and Freight Services",
    "Route, Courier, and Delivery Services",
    "Other",
  ],
  "Construction and Real Estate": [
    "Building and Construction Services",
    "HVAC and Plumbing Services",
    "Electrical Services",
    "Real Estate Development",
    "Other",
  ],
  "Agriculture and Landscaping": [
    "Farms and Ranches",
    "Landscaping and Garden Centers",
    "Agricultural Supply Businesses",
    "Other",
  ],
  "Education and Training": [
    "Child Care and Nurseries",
    "Educational and Training Services",
    "Corporate Training Services",
    "Other",
  ],
  "Leisure and Entertainment": [
    "Entertainment and Recreation Facilities (Cinemas, Theaters)",
    "Art Galleries and Museums",
    "Sports and Fitness Clubs",
    "Event Planning and Services",
    "Other",
  ],
  "Personal and Consumer Services": [
    "Laundromats and Dry Cleaning",
    "House Cleaning Services",
    "Pet Grooming and Boarding",
    "Personal Care Services (like massage, personal training)",
    "Other",
  ],
  "Wholesale and Distribution": [
    "Food and Drink Distributors",
    "Health and Beauty Supplies",
    "Industrial and Commercial Supplies",
    "Other",
  ],
};

export const industries = Object.keys(industriesMapping);
export const industriesSuccessionPlan = [
  'Retail',
  'Food and Hospitality',
  'Health and Wellness',
  'Professional Services',
  'Manufacturing',
  'Technology and Media',
  'Automotive and Landscaping',
  'Education and Training',
  'Leisure and Entertainment',
  'Personal and Consumer Services',
  'Wholesale and Distribution',
]
export const subIndustries = Object.values(industriesMapping).flat();

export const provinces = [{
  value: 'NL',
  label: 'NL',
},
{
  value: 'PE',
  label: 'PE',
},
{
  value: 'NS',
  label: 'NS',
},
{
  value: 'NB',
  label: 'NB',
},
{
  value: 'QC',
  label: 'QC',
},
{
  value: 'ON',
  label: 'ON',
},
{
  value: 'MB',
  label: 'MB',
},
{
  value: 'SK',
  label: 'SK',
},
{
  value: 'AB',
  label: 'AB',
},
{
  value: 'BC',
  label: 'BC',
},
{
  value: 'YT',
  label: 'YT',
},
{
  value: 'NT',
  label: 'NT',
},
{
  value: 'NU',
  label: 'NU',
}];

export const countries = [
  { value: 'USA', label: 'USA' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Jamaica', label: 'Jamaica' },
];
