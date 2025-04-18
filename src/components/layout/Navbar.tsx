
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-ewu-primary">EWU</span>
            <span className="font-medium hidden sm:inline-block">Connect</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-ewu-accent"></span>
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
