
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogIn, MapPin, Users, Globe } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-voyager-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent voyager-gradient">
            Travel Bud's
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/discover" className="px-4 py-2 rounded-full hover:bg-secondary transition-colors flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Discover Buddies</span>
          </Link>
          <Link to="/destinations" className="px-4 py-2 rounded-full hover:bg-secondary transition-colors flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Destinations</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-voyager-light text-voyager-primary">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogIn className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="voyager-button">
                <LogIn className="w-4 h-4 mr-2" />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
