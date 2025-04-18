
import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  LayoutDashboard, 
  User, 
  FileText, 
  Users, 
  Search,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calculator, label: 'CGPA Planner', path: '/cgpa' },
    { icon: Calendar, label: 'Class Routine', path: '/routine' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Users, label: 'Mentorship', path: '/mentorship' },
    { icon: Search, label: 'Lost & Found', path: '/lost-found' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed inset-y-0 left-0 z-20 w-64 bg-background border-r transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full py-4">
        <div className="px-4 py-2 mb-6">
          <h2 className="text-xl font-bold text-ewu-primary">EWU Connect</h2>
          <p className="text-xs text-muted-foreground">Academic Companion</p>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-item ${item.path === '/' ? 'active' : ''}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="px-4 py-2 mt-6">
          <div className="rounded-lg bg-muted p-3">
            <h3 className="font-medium text-sm">Need Help?</h3>
            <p className="text-xs text-muted-foreground mt-1">Contact support or check our help guides.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
