
import { User } from "@/types";

export const mockTravelers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@example.com",
    bio: "Digital nomad exploring Southeast Asia. Love hiking, local food, and photography.",
    interests: ["Hiking", "Photography", "Food", "Culture"],
    currentDestination: "Bangkok, Thailand",
    upcomingDestinations: [
      { id: "d1", name: "Chiang Mai", countryCode: "TH", startDate: "2025-05-10" },
      { id: "d2", name: "Hanoi", countryCode: "VN", startDate: "2025-05-20" }
    ],
    travelStyle: ["Budget", "Adventure", "Cultural"],
    verificationStatus: "verified"
  },
  {
    id: "2",
    name: "Sophie Martin",
    email: "sophie@example.com",
    bio: "Art enthusiast on a year-long sabbatical. Looking for museum buddies and people to share coffee with.",
    interests: ["Art", "Museums", "Cafes", "History"],
    currentDestination: "Paris, France",
    upcomingDestinations: [
      { id: "d3", name: "Amsterdam", countryCode: "NL", startDate: "2025-05-15" },
      { id: "d4", name: "Berlin", countryCode: "DE", startDate: "2025-05-25" }
    ],
    travelStyle: ["Mid-range", "Cultural", "Urban"],
    verificationStatus: "verified"
  },
  {
    id: "3",
    name: "Miguel Santos",
    email: "miguel@example.com",
    bio: "Surfer and yoga teacher exploring coastal towns. Always up for sunrise beach sessions and local food.",
    interests: ["Surfing", "Yoga", "Beaches", "Vegetarian Food"],
    currentDestination: "Bali, Indonesia",
    upcomingDestinations: [
      { id: "d5", name: "Gold Coast", countryCode: "AU", startDate: "2025-06-01" }
    ],
    travelStyle: ["Budget", "Outdoor", "Wellness"],
    verificationStatus: "verified"
  },
  {
    id: "4",
    name: "Emma Johnson",
    email: "emma@example.com",
    bio: "Wildlife photographer on a mission to document endangered species. Love trekking and camping under stars.",
    interests: ["Photography", "Wildlife", "Trekking", "Nature"],
    currentDestination: "Nairobi, Kenya",
    upcomingDestinations: [
      { id: "d6", name: "Serengeti", countryCode: "TZ", startDate: "2025-05-12" },
      { id: "d7", name: "Cape Town", countryCode: "ZA", startDate: "2025-06-05" }
    ],
    travelStyle: ["Mid-range", "Adventure", "Eco-friendly"],
    verificationStatus: "verified"
  },
  {
    id: "5",
    name: "Raj Patel",
    email: "raj@example.com",
    bio: "Foodie on a global culinary tour. Seeking fellow food enthusiasts to explore markets and cooking classes.",
    interests: ["Cooking", "Food Tours", "Markets", "Street Food"],
    currentDestination: "Tokyo, Japan",
    upcomingDestinations: [
      { id: "d8", name: "Seoul", countryCode: "KR", startDate: "2025-05-18" },
      { id: "d9", name: "Taipei", countryCode: "TW", startDate: "2025-05-28" }
    ],
    travelStyle: ["Foodie", "Cultural", "Urban"],
    verificationStatus: "verified"
  },
  {
    id: "6",
    name: "Nina Schmidt",
    email: "nina@example.com",
    bio: "Solo backpacker taking a gap year after university. Love hiking, hostels, and making spontaneous plans.",
    interests: ["Backpacking", "Hostels", "Hiking", "Budget Travel"],
    currentDestination: "Cusco, Peru",
    upcomingDestinations: [
      { id: "d10", name: "La Paz", countryCode: "BO", startDate: "2025-05-22" },
      { id: "d11", name: "Santiago", countryCode: "CL", startDate: "2025-06-10" }
    ],
    travelStyle: ["Budget", "Backpacker", "Adventure"],
    verificationStatus: "verified"
  }
];

export const getRandomTravelers = (count: number): User[] => {
  const shuffled = [...mockTravelers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
