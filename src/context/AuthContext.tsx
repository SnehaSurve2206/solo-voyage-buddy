
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('voyagerUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would normally be an API call to authenticate
      // For now, we'll simulate a successful login if the password is not empty
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Normally you'd get this from your backend
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        interests: ['Hiking', 'Food', 'Photography'],
        travelStyle: ['Budget', 'Adventure'],
        currentDestination: 'Bangkok, Thailand',
        verificationStatus: 'verified' // Added this required field
      };
      
      setUser(mockUser);
      localStorage.setItem('voyagerUser', JSON.stringify(mockUser));
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // This would normally be an API call to register a new user
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user object
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        interests: [],
        travelStyle: [],
        verificationStatus: 'pending' // Added this required field
      };
      
      setUser(newUser);
      localStorage.setItem('voyagerUser', JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voyagerUser');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
