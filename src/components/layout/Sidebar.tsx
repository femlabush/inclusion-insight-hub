import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  Database, 
  Upload, 
  Users, 
  Activity,
  FileText,
  Settings,
  Home
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: ('admin' | 'analyst')[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['admin', 'analyst']
  },
  // Admin routes
  {
    title: 'Data Upload',
    href: '/admin/upload',
    icon: Upload,
    roles: ['admin']
  },
  {
    title: 'Processing Status',
    href: '/admin/processing',
    icon: Activity,
    roles: ['admin']
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    roles: ['admin']
  },
  // Analyst routes
  {
    title: 'Analytics',
    href: '/analyst/analytics',
    icon: BarChart3,
    roles: ['analyst']
  },
  {
    title: 'Reports',
    href: '/analyst/reports',
    icon: FileText,
    roles: ['analyst']
  },
  // Shared routes
  {
    title: 'Data Sources',
    href: '/data-sources',
    icon: Database,
    roles: ['admin', 'analyst']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'analyst']
  }
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-muted/30 border-r border-border">
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};