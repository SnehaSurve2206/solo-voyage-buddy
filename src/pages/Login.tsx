import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LogIn, UserPlus, Globe } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  // Form data states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  
  // Form submission handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(signupData.email, signupData.password, signupData.name);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-voyager-light/30">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Globe className="w-8 h-8 text-voyager-primary" />
          <span className="text-2xl font-bold bg-clip-text text-transparent voyager-gradient">
            SoloVoyage
          </span>
        </Link>
        
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Welcome Explorer</CardTitle>
            <CardDescription className="text-center">
              Your next adventure begins here
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email"
                      type="email" 
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={e => setLoginData({...loginData, email: e.target.value})}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password"
                      type="password" 
                      value={loginData.password}
                      onChange={e => setLoginData({...loginData, password: e.target.value})}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full voyager-gradient" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Start Your Journey
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input 
                      id="signup-name"
                      placeholder="Your Name"
                      value={signupData.name}
                      onChange={e => setSignupData({...signupData, name: e.target.value})}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email"
                      type="email" 
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={e => setSignupData({...signupData, email: e.target.value})}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password"
                      type="password" 
                      value={signupData.password}
                      onChange={e => setSignupData({...signupData, password: e.target.value})}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full voyager-gradient" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Begin Your Adventure
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            By continuing, you agree to SoloVoyage's Terms of Service and Privacy Policy.
          </CardFooter>
        </Card>
      </div>

      {/* Right side - Inspirational Image */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-voyager-primary/20 to-voyager-tertiary/40 z-10" />
        <AspectRatio ratio={16/9} className="h-full">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            alt="Scenic mountain landscape"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white z-20">
          <h2 className="text-3xl font-bold mb-2">Discover New Horizons</h2>
          <p className="text-lg opacity-90">Connect with fellow travelers and explore the world together</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
