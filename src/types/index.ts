
export interface Destination {
  id: string;
  name: string;
  countryCode: string;
  startDate: string;
}

export type VerificationStatus = "verified" | "pending" | "rejected" | "unverified";

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  interests: string[];
  currentDestination: string;
  upcomingDestinations: Destination[];
  travelStyle: string[];
  verificationStatus: VerificationStatus;
  avatar?: string;
}
