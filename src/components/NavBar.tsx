
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, User, LogIn } from 'lucide-react';

interface NavBarProps {
  isAuthenticated?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated = false }) => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="text-primary text-2xl font-bold">SwitchStack</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/roles" className="text-foreground hover:text-primary transition-colors">
            Explore Roles
          </Link>
          <Link to="/roadmaps" className="text-foreground hover:text-primary transition-colors">
            Roadmaps
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          <Link to="/roles">
            <Button variant="default" className="hidden sm:flex">
              Find Roles
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
