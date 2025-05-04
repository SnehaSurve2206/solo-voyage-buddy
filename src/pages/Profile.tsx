import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, Edit, Globe, Heart, MessageCircle, Settings } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      toast.error('Please login to view your profile');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>My Profile</CardTitle>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 border-4 border-voyager-light mb-4">
                      <AvatarFallback className="bg-voyager-light text-voyager-primary text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    {user.currentDestination && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.currentDestination}
                      </div>
                    )}
                    
                    <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/profile/edit')}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  {user.bio && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2">About</h3>
                      <p className="text-sm">{user.bio || 'Tell others about yourself by updating your profile.'}</p>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests && user.interests.length > 0 ? (
                        user.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Add your travel interests to connect with like-minded travelers</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2 flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      Travel Style
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.travelStyle && user.travelStyle.length > 0 ? (
                        user.travelStyle.map((style, idx) => (
                          <Badge key={idx} variant="outline" className="bg-voyager-light/50">
                            {style}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Add your travel preferences to find better matches</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Trips & Activity */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="trips">
                <TabsList className="mb-6 w-full">
                  <TabsTrigger value="trips" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Trips
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    Connections
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Saved
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="trips">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Trips</CardTitle>
                      <CardDescription>
                        Manage your current and upcoming travel destinations
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {user.currentDestination ? (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2">
                            Current Destination
                          </h3>
                          <div className="bg-voyager-light/30 rounded-lg p-4 flex items-center">
                            <MapPin className="h-5 w-5 text-voyager-accent mr-3" />
                            <div>
                              <p className="font-medium">{user.currentDestination}</p>
                              <p className="text-sm text-muted-foreground">Currently exploring</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 mb-6">
                          <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p>No current destination set</p>
                          <Button onClick={() => navigate('/profile/edit')} variant="link" className="text-voyager-primary">
                            Add your current location
                          </Button>
                        </div>
                      )}
                      
                      <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2">
                        Upcoming Destinations
                      </h3>
                      
                      {user.upcomingDestinations && user.upcomingDestinations.length > 0 ? (
                        <div className="space-y-3">
                          {user.upcomingDestinations.map(destination => (
                            <div 
                              key={destination.id} 
                              className="bg-muted rounded-lg p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <Globe className="h-5 w-5 text-voyager-primary mr-3" />
                                <div>
                                  <p className="font-medium">{destination.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {destination.startDate && new Date(destination.startDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Badge variant="outline" className="bg-voyager-light/50">
                                  {destination.countryCode}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 border border-dashed border-border rounded-lg">
                          <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p>No upcoming trips planned</p>
                          <Button onClick={() => navigate('/profile/edit')} variant="link" className="text-voyager-primary">
                            Add your travel plans
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <Button className="w-full voyager-button voyager-gradient">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add New Trip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="connections">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Connections</CardTitle>
                      <CardDescription>
                        Travel buddies you've connected with
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-lg font-medium mb-1">No connections yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Discover and connect with other solo travelers to start building your network
                        </p>
                        <Button className="voyager-button voyager-gradient" onClick={() => navigate('/discover')}>
                          <User className="h-4 w-4 mr-2" />
                          Find Travel Buddies
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Profiles</CardTitle>
                      <CardDescription>
                        Travelers you've saved for later
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-lg font-medium mb-1">No saved profiles yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Save travelers you're interested in connecting with later
                        </p>
                        <Button className="voyager-button voyager-gradient" onClick={() => navigate('/discover')}>
                          <User className="h-4 w-4 mr-2" />
                          Discover Travelers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
