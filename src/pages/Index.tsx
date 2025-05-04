import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, MapPin, Users, Globe } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { getRandomTravelers } from '@/data/mockTravelers';
import { User } from '@/types';

const Index = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedBuddies, setSuggestedBuddies] = useState<User[]>(getRandomTravelers(3));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-voyager-tertiary to-voyager-primary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your Perfect Travel Companion
              </h1>
              <p className="text-lg sm:text-xl opacity-90 mb-8">
                Connect with like-minded solo travelers, share experiences, and explore the world together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/discover" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full">
                    <Users className="mr-2 h-5 w-5" />
                    Find Travel Buddies
                  </Button>
                </Link>
                {!user && (
                  <Link to="/login" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white text-voyager-primary hover:bg-gray-100">
                      Join Travel Bud's
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        </section>

        {/* Search Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search destinations or interests..."
                  className="pl-10 h-12 text-lg rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Thailand</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Japan</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Hiking</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Photography</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Food Tours</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Budget Travel</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested Travelers */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Suggested Travel Buddies</h2>
              <p className="text-muted-foreground">Connect with travelers who share your interests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedBuddies.map((traveler) => (
                <Card key={traveler.id} className="voyager-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12 border-2 border-voyager-light">
                          <AvatarFallback className="bg-voyager-light text-voyager-primary">
                            {traveler.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-lg">{traveler.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {traveler.currentDestination}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {traveler.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {traveler.interests?.slice(0, 3).map((interest, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {(traveler.interests?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(traveler.interests?.length || 0) - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <Button variant="outline" className="w-full voyager-button border-voyager-primary text-voyager-primary hover:bg-voyager-light">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/discover">
                <Button variant="outline" size="lg" className="voyager-button">
                  <Users className="mr-2 h-4 w-4" />
                  Discover More Travelers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">How Travel Bud's Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to find travel companions who share your interests and destinations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full voyager-gradient flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Share Your Journey</h3>
                <p className="text-muted-foreground">
                  Create a profile with your travel style, interests and upcoming destinations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full voyager-gradient flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Discover Travelers</h3>
                <p className="text-muted-foreground">
                  Find like-minded travelers who are visiting the same destinations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full voyager-gradient flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Connect & Explore</h3>
                <p className="text-muted-foreground">
                  Message your matches, plan meetups, and explore the world together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-voyager-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Globe className="h-6 w-6 text-voyager-tertiary" />
                <span className="text-xl font-bold">Travel Bud's</span>
              </div>
              <p className="mt-2 text-sm text-gray-400 max-w-xs">
                Connecting solo travelers for safer, more memorable adventures around the globe.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-center md:text-left">
              <div>
                <h3 className="text-sm font-semibold mb-4 text-gray-300">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/destinations" className="text-gray-400 hover:text-white">Destinations</Link></li>
                  <li><Link to="/discover" className="text-gray-400 hover:text-white">Find Buddies</Link></li>
                  <li><Link to="/about" className="text-gray-400 hover:text-white">How It Works</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 text-gray-300">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Travel Bud's. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
