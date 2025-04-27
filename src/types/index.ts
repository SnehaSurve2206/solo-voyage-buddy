
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  interests: string[];
  profilePic?: string;
  verificationStatus: 'pending' | 'verified' | 'unverified';
  bio?: string;
  currentDestination?: string;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  tripId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}
