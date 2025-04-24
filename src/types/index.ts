
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  interests?: string[];
  currentDestination?: string;
  upcomingDestinations?: Destination[];
  travelStyle?: string[];
}

export interface Destination {
  id: string;
  name: string;
  countryCode: string;
  startDate?: string;
  endDate?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}
