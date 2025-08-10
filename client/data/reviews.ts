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
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Global Solutions",
    quote: "Suzanna's powerful message of growth and overcoming challenges resonated deeply with our team. Her speaking engagement transformed our company culture.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder",
    company: "Startup Ventures",
    quote: "The way Suzanna connects faith with personal development is truly inspiring. Her workshops have been a game-changer for our organization.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    role: "HR Manager",
    company: "Corporate Excellence",
    quote: "Suzanna's approach to healing and purpose-driven leadership has helped our team overcome obstacles and achieve remarkable growth.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Executive Director",
    company: "Non-Profit Alliance",
    quote: "Her message of empowerment and divine purpose has inspired our entire organization to reach new heights of success and fulfillment.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
  }
]; 