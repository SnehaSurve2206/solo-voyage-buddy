
import { User } from "@/types";

export const mockTravelers: User[] = [
  {
    id: "1",
    name: "Arjun Patel",
    email: "arjun@example.com",
    bio: "Adventure seeker exploring the diverse landscapes of India. Love trekking, local cuisine, and capturing moments.",
    interests: ["Trekking", "Photography", "Food", "Culture"],
    currentDestination: "Varanasi, India",
    upcomingDestinations: [
      { id: "d1", name: "Rishikesh", countryCode: "IN", startDate: "2025-05-10" },
      { id: "d2", name: "Udaipur", countryCode: "IN", startDate: "2025-05-20" }
    ],
    travelStyle: ["Adventure", "Cultural", "Photography"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/5c4e9825-196a-44a1-ad51-add6ea6af711.png"
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    bio: "Heritage enthusiast exploring ancient temples and historical sites. Looking for fellow history lovers.",
    interests: ["History", "Architecture", "Art", "Temples"],
    currentDestination: "Jaipur, India",
    upcomingDestinations: [
      { id: "d3", name: "Hampi", countryCode: "IN", startDate: "2025-05-15" },
      { id: "d4", name: "Khajuraho", countryCode: "IN", startDate: "2025-05-25" }
    ],
    travelStyle: ["Cultural", "Heritage", "Luxury"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/76cb3077-a3ee-4723-bf08-21fdc285fd6f.png"
  },
  {
    id: "3",
    name: "Ravi Krishna",
    email: "ravi@example.com",
    bio: "Yoga practitioner and meditation enthusiast. Exploring spiritual destinations across India.",
    interests: ["Yoga", "Meditation", "Spirituality", "Vegetarian Food"],
    currentDestination: "Rishikesh, India",
    upcomingDestinations: [
      { id: "d5", name: "Dharamshala", countryCode: "IN", startDate: "2025-06-01" }
    ],
    travelStyle: ["Spiritual", "Wellness", "Budget"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/6537d9ef-07a7-405d-8d71-312b93da6d9f.png"
  },
  {
    id: "4",
    name: "Aisha Khan",
    email: "aisha@example.com",
    bio: "Wildlife photographer documenting India's diverse fauna. Love national parks and tiger reserves.",
    interests: ["Wildlife", "Photography", "Nature", "Conservation"],
    currentDestination: "Ranthambore, India",
    upcomingDestinations: [
      { id: "d6", name: "Kaziranga", countryCode: "IN", startDate: "2025-05-12" },
      { id: "d7", name: "Bandhavgarh", countryCode: "IN", startDate: "2025-06-05" }
    ],
    travelStyle: ["Adventure", "Nature", "Photography"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/7ede296a-1b1b-46f8-a106-785dcb08058f.png"
  },
  {
    id: "5",
    name: "Dev Sharma",
    email: "dev@example.com",
    bio: "Culinary explorer on a mission to taste every regional Indian cuisine. Love street food and cooking classes.",
    interests: ["Food", "Cooking", "Markets", "Culture"],
    currentDestination: "Mumbai, India",
    upcomingDestinations: [
      { id: "d8", name: "Kochi", countryCode: "IN", startDate: "2025-05-18" },
      { id: "d9", name: "Amritsar", countryCode: "IN", startDate: "2025-05-28" }
    ],
    travelStyle: ["Foodie", "Cultural", "Urban"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/5c4e9825-196a-44a1-ad51-add6ea6af711.png"
  },
  {
    id: "6",
    name: "Meera Reddy",
    email: "meera@example.com",
    bio: "Backpacker exploring off-beat destinations in Northeast India. Love hiking and local festivals.",
    interests: ["Backpacking", "Hiking", "Festivals", "Local Culture"],
    currentDestination: "Gangtok, India",
    upcomingDestinations: [
      { id: "d10", name: "Tawang", countryCode: "IN", startDate: "2025-05-22" },
      { id: "d11", name: "Majuli", countryCode: "IN", startDate: "2025-06-10" }
    ],
    travelStyle: ["Budget", "Adventure", "Cultural"],
    verificationStatus: "verified",
    avatar: "/lovable-uploads/6537d9ef-07a7-405d-8d71-312b93da6d9f.png"
  }
];

export const getRandomTravelers = (count: number): User[] => {
  const shuffled = [...mockTravelers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
