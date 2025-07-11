export interface Service {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number | null;
  priceDisplay: string;
  category: string;
  features?: string[];
  setupTime?: string;
}

export const services: Service[] = [
  // Car Services
  {
    "id": 1,
    "name": "Exterior Wash (Car)",
    "image": "https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/WhatsApp%20Image%202025-05-25%20at%2019.29.35.jpeg?alt=media&token=15aa7c1f-3ee7-4978-84db-25c5c84b3ef8",
    "description": "Exterior Wash service for cars",
    "price": 80,
    "priceDisplay": "$80",
    "category": "basic",
    "features": [
      "Full hand wash",
      "Rims detailed",
      "Tire shine",
      "Hand Dry"
    ]
  },
  {
    "id": 2,
    "name": "Full Interior (Car)",
    "image": "https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/WhatsApp%20Image%202025-05-25%20at%2019.29.32.jpeg?alt=media&token=7f1298f8-a10c-460f-8491-07a50963fe82",
    "description": "Complete interior detailing for cars",
    "price": 105,
    "priceDisplay": "$105",
    "category": "interior",
    "features": [
      "Vacuum interior",
      "Air Blow",
      "Steam and shampoo",
      "Wipe interior",
      "Wash + Wipe mats",
      "Windows cleaned",
      "Air purge",
      "Leather conditioner"
    ]
  },
  {
    "id": 3,
    "name": "Monthly Detail (Car)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Comprehensive monthly detailing service for cars",
    "price": 145,
    "priceDisplay": "$145",
    "category": "maintenance",
    "features": [
      "Vacuum interior",
      "Wipe Interior",
      "Air-blow Interior",
      "Full hand Wash",
      "Wash & Wipe mats",
      "Windows cleaned",
      "Rims detailed",
      "Hand Dry",
      "Tire shine"
    ]
  },
  {
    "id": 4,
    "name": "Full Detail (Car)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Premium detailing package for cars",
    "price": 185,
    "priceDisplay": "$185",
    "category": "premium",
    "features": [
      "Vacuum interior",
      "Exterior Wash",
      "Interior wipe down",
      "Air-blow interior",
      "Steam + Shampoo Interior",
      "Mats scrub + wipe down",
      "Exterior Wash",
      "Rims detailed",
      "Hand Dry",
      "Tire shine",
      "Vacuum interior",
      "Wipe interior",
      "Clean mats",
      "Windows cleaned"
    ]
  },
  {
    "id": 5,
    "name": "Hand Wax (Car)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Manual waxing service for cars",
    "price": 75,
    "priceDisplay": "$75",
    "category": "protection"
  },

  // SUV Services
  {
    "id": 6,
    "name": "Exterior Wash (SUV)",
    "image": "https://firebasestorage.googleapis.com/v0/b/mystery-mobile-detailing.firebasestorage.app/o/WhatsApp%20Image%202025-05-25%20at%2019.30.20.jpeg?alt=media&token=ab2e5516-ed5f-4083-9d3a-d4c76d61ba07",
    "description": "Exterior Wash service for SUVs",
    "price": 95,
    "priceDisplay": "$95",
    "category": "basic",
    "features": [
      "Exterior Wash",
      "Rims detailed",
      "Tire shine",
      "Hand Dry"
    ]
  },
  {
    "id": 7,
    "name": "Full Interior (SUV)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Complete interior detailing for SUVs",
    "price": 130,
    "priceDisplay": "$130",
    "category": "interior",
    "features": [
      "Vacuum interior",
      "Steam and shampoo",
      "Wipe interior",
      "Clean mats",
      "Windows cleaned",
      "Air purge interior",
      "Steam interior",
      "Full shampoo",
      "Leather conditioner"
    ]
  },
  {
    "id": 8,
    "name": "Monthly Detail (SUV)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Comprehensive monthly detailing service for SUVs",
    "price": 160,
    "priceDisplay": "$160",
    "category": "maintenance",
    "features": [
      "Vacuum interior",
      "Wipe Interior",
      "Air-blow Interior",
      "Full hand Wash",
      "Wash & Wipe mats",
      "Windows cleaned",
      "Rims detailed",
      "Hand Dry",
      "Tire shine"
    ]
  },
  {
    "id": 9,
    "name": "Full Detail (SUV)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Premium detailing package for SUVs",
    "price": 225,
    "priceDisplay": "$225",
    "category": "premium",
    "features": [
      "Vacuum interior",
      "Exterior Wash",
      "Interior wipe down",
      "Air-blow interior",
      "Steam + Shampoo Interior",
      "Mats scrub + wipe down",
      "Rims detailed",
      "Hand Dry",
      "Vacuum interior",
      "Steam and shampoo",
      "Wipe interior",
      "Clean mats",
      "Windows cleaned",
      "Air purge interior",
      "Steam interior",
      "Full shampoo",
      "Leather conditioner"
    ]
  },
  {
    "id": 10,
    "name": "Express Full Detailing (SUV)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Quick but comprehensive detailing service for SUVs",
    "price": 155,
    "priceDisplay": "$155",
    "category": "express",
    "features": [
      "Full vacuum",
      "Exterior Wash",
      "Full wipe",
      "Windows clean",
      "Rubber mats clean",
      "Exterior hand wash",
      "Hand dry",
      "Tire shine"
    ]
  },
  {
    "id": 11,
    "name": "Hand Wax (SUV)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Manual waxing service for SUVs",
    "price": 100,
    "priceDisplay": "$100",
    "category": "protection"
  },

  // 7-Seater Services
  {
    "id": 12,
    "name": "Full Interior (7 Seater, Mini Van, Pickup Truck)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Complete interior detailing for 7-seaters and mini vans",
    "price": 140,
    "priceDisplay": "$140",
    "category": "interior",
    "features": [
      "Vacuum interior",
      "Steam and shampoo",
      "Wipe interior",
      "Clean mats",
      "Windows cleaned",
      "Air purge interior",
      "Steam interior",
      "Full shampoo",
      "Leather conditioner"
    ]
  },
  {
    "id": 13,
    "name": "Full Exterior (7 Seater, Mini Van, Pickup Truck)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Complete exterior detailing for 7-seaters and mini vans",
    "price": 140,
    "priceDisplay": "$140",
    "category": "exterior",
    "features": [
      "Exterior Wash",
      "Rims detailed",
      "Tire shine",
      "Hand Dry"
    ]
  },
  {
    "id": 14,
    "name": "Full Detail (7 Seater, Mini Van, Pickup Truck)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Premium detailing package for 7-seaters and mini vans",
    "price": 240,
    "priceDisplay": "$240",
    "category": "premium",
    "features": [
      "Vacuum interior",
      "Exterior Wash",
      "Steam and shampoo",
      "Wipe interior",
      "Clean mats",
      "Windows cleaned",
      "Air purge interior",
      "Exterior Wash",
      "Hand Dry"
    ]
  },
  {
    "id": 15,
    "name": "Monthly Detail (7 Seater, Mini Van, Pickup Truck)",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Comprehensive monthly detailing service for 7-seaters and mini vans",
    "price": 175,
    "priceDisplay": "$175",
    "category": "maintenance",
    "features": [
      "Vacuum interior",
      "Wipe Interior",
      "Air blow",
      "Full hand wash",
      "Hand dry",
      "Rims detailed",
      "Tire shine",
      "Windows cleaned",
      "Wash & Wipe mats"
    ]
  },

  // Add-on Services
  {
    "id": 16,
    "name": "Baby Seat Cleaning",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Specialized cleaning for baby car seats",
    "price": 20,
    "priceDisplay": "$20",
    "category": "add-on"
  },
  {
    "id": 17,
    "name": "Pet Hair Removal",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Specialized service for removing pet hair from vehicle interior",
    "price": 50,
    "priceDisplay": "$50",
    "category": "add-on"
  },
  {
    "id": 18,
    "name": "Headlight Cleaning",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Restoration service for foggy or yellowed headlights",
    "price": 50,
    "priceDisplay": "$50",
    "category": "add-on"
  },

  // Protection Services
  {
    "id": 19,
    "name": "Ceramic Coating",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Advanced protection for your vehicle's paint",
    "price": 275,
    "priceDisplay": "$275",
    "category": "protection"
  },

  // Specialty Services
  {
    "id": 20,
    "name": "Engine Detail",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Thorough cleaning of the engine bay",
    "price": 45,
    "priceDisplay": "$45",
    "category": "specialty",
    "features": [
      "Entire engine bay gets thoroughly detailed"
    ]
  },
  {
    "id": 21,
    "name": "Boat Detailing",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Professional detailing services for boats",
    "price": 600,
    "priceDisplay": "$600",
    "category": "specialty"
  },
  {
    "id": 22,
    "name": "Heavy Machinery Detailing",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Professional detailing for heavy machinery",
    "price": null,
    "priceDisplay": "Inquire",
    "category": "specialty"
  },
  {
    "id": 23,
    "name": "RV Detailing",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Professional detailing services for recreational vehicles",
    "price": null,
    "priceDisplay": "Inquire",
    "category": "specialty"
  },
  {
    "id": 24,
    "name": "Semi Truck Detailing",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Professional detailing services for semi trucks",
    "price": null,
    "priceDisplay": "Inquire",
    "category": "specialty"
  },

  // Business Services
  {
    "id": 25,
    "name": "Fleet Discount",
    "image": "https://images.unsplash.com/photo-1605437241398-a6e27e305a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGRldGFpbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "description": "Special pricing for business fleets",
    "price": null,
    "priceDisplay": "Inquire for Fleet Discount Pricing",
    "category": "business"
  }
];

export const getFeaturedServices = () => {
  return services.filter(service => 
    service.category === 'basic' || 
    service.category === 'interior' || 
    service.category === 'premium'
  ).slice(0, 4);
};

export const getServicesByCategory = (category: string) => {
  return services.filter(service => service.category === category);
};

export const getServiceById = (id: number) => {
  return services.find(service => service.id === id);
}; 