export interface Review {
  id: number;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  image: string;
}

export const speakingReviews: Review[] = [
  {
    id: 1,
    name: "Richard Smith",
    role: "CEO",
    company: "Tech Innovations Inc.",
    quote: "Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/84c4db0a22799e5b304333c26b0573208d4df824?width=362"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Global Solutions",
    quote: "Suzanna's powerful message of growth and overcoming challenges resonated deeply with our team. Her speaking engagement transformed our company culture.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/84c4db0a22799e5b304333c26b0573208d4df824?width=362"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder",
    company: "Startup Ventures",
    quote: "The way Suzanna connects faith with personal development is truly inspiring. Her workshops have been a game-changer for our organization.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/84c4db0a22799e5b304333c26b0573208d4df824?width=362"
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    role: "HR Manager",
    company: "Corporate Excellence",
    quote: "Suzanna's approach to healing and purpose-driven leadership has helped our team overcome obstacles and achieve remarkable growth.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/84c4db0a22799e5b304333c26b0573208d4df824?width=362"
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Executive Director",
    company: "Non-Profit Alliance",
    quote: "Her message of empowerment and divine purpose has inspired our entire organization to reach new heights of success and fulfillment.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/84c4db0a22799e5b304333c26b0573208d4df824?width=362"
  }
]; 