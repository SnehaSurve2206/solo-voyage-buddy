
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-voyager-light/30 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Globe className="h-16 w-16 text-voyager-primary mx-auto" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-voyager-primary">404</h1>
        <p className="text-2xl font-medium mb-4">Destination Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for seems to be off the map. Let's get you back on track.
        </p>
        <Link to="/">
          <Button className="voyager-button voyager-gradient">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
