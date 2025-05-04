import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, MessageCircle, Calendar, User, Heart } from 'lucide-react';
import { mockTravelers } from '@/data/mockTravelers';
import { User as UserType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Discover = () => {
  const { user } = useAuth();
  const [travelers, setTravelers] = useState<UserType[]>(mockTravelers);
  const [filteredTravelers, setFilteredTravelers] = useState<UserType[]>(mockTravelers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Extract all unique interests
  const allInterests = Array.from(
    new Set(travelers.flatMap(traveler => traveler.interests || []))
  );
  
  // Handle search and filtering
  useEffect(() => {
    let results = [...travelers];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        traveler => 
          traveler.name.toLowerCase().includes(term) || 
          traveler.currentDestination?.toLowerCase().includes(term) ||
          traveler.bio?.toLowerCase().includes(term) ||
          traveler.interests?.some(interest => interest.toLowerCase().includes(term))
      );
    }
    
    if (selectedInterests.length > 0) {
      results = results.filter(
        traveler => selectedInterests.some(interest => 
          traveler.interests?.includes(interest)
        )
      );
    }
    
    if (activeTab === 'nearby') {
      // In a real app, this would filter by location proximity
      // For now, just showing a random subset
      results = results.slice(0, 3);
    } else if (activeTab === 'similar') {
      // In a real app, this would show travelers with similar interests
      // For now, just showing travelers with Photography interest as an example
      results = results.filter(traveler => 
        traveler.interests?.includes('Photography')
      );
    }
    
    setFilteredTravelers(results);
  }, [searchTerm, travelers, selectedInterests, activeTab]);
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const handleConnect = (traveler: UserType) => {
    if (!user) {
      toast.error("Please sign in to connect with other travelers");
      return;
    }
    
    toast.success(`Connection request sent to ${traveler.name}`);
  };
  
  const handleSaveProfile = (traveler: UserType) => {
    if (!user) {
      toast.error("Please sign in to save profiles");
      return;
    }
    
    toast.success(`You saved ${traveler.name}'s profile`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 pb-12">
        {/* Header with new gradient */}
        <div className="bg-gradient-to-r from-voyager-primary to-voyager-tertiary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Travel Buddies</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Find like-minded travelers heading to the same destinations. Connect, chat, and plan adventures together.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-6">
          {/* Search and filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, destination, or interests..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full lg:w-auto"
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
                    <TabsTrigger value="similar" className="flex-1">Similar Interests</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Filter by interests:</p>
                <div className="flex flex-wrap gap-2">
                  {allInterests.map(interest => (
                    <Badge 
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Results with new image display */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              {filteredTravelers.length} Travelers Found
            </h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTravelers.map(traveler => (
                <Card key={traveler.id} className="voyager-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full"
                          onClick={() => handleSaveProfile(traveler)}
                        >
                          <Heart className="h-5 w-5 text-muted-foreground hover:text-voyager-accent" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {traveler.bio}
                      </p>
                      
                      {traveler.upcomingDestinations && traveler.upcomingDestinations.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium uppercase text-muted-foreground mb-2 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Upcoming Destinations
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {traveler.upcomingDestinations.map(destination => (
                              <Badge key={destination.id} variant="outline" className="bg-voyager-light/50">
                                {destination.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {traveler.interests && traveler.interests.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs font-medium uppercase text-muted-foreground mb-2 flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            Interests
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {traveler.interests.map((interest, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 voyager-gradient"
                          onClick={() => handleConnect(traveler)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredTravelers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No travelers matching your criteria were found.</p>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
