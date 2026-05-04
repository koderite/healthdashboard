import { Home, Users, Calendar, MessageSquare, CreditCard, Search, MoreHorizontal, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: typeof Home;
  label: string;
  active?: boolean;
}

const topNavItems: NavItem[] = [
  { icon: Home, label: 'Overview' },
  { icon: Users, label: 'Patients', active: true },
  { icon: Calendar, label: 'Schedule' },
  { icon: MessageSquare, label: 'Message' },
  { icon: CreditCard, label: 'Transactions' },
];

const bottomNavItems: NavItem[] = [
  { icon: Search, label: 'Search' },
  { icon: MoreHorizontal, label: 'More' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-20 min-h-screen bg-white border-r border-gray-100 flex flex-col items-center py-6 fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="mb-10">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Top Navigation - Icon Only */}
      <nav className="flex-1 flex flex-col items-center gap-3">
        {topNavItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className={cn(
              'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-150 group',
              item.active
                ? 'bg-teal-light text-primary'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            )}
          >
            <item.icon className={cn(
              'w-5 h-5 transition-transform duration-150 group-hover:scale-110',
              item.active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'
            )} />
          </button>
        ))}
      </nav>

      {/* Bottom Navigation - Icon Only */}
      <div className="flex flex-col items-center gap-3">
        {bottomNavItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-150 group"
          >
            <item.icon className="w-5 h-5 transition-transform duration-150 group-hover:scale-110" />
          </button>
        ))}
      </div>
    </aside>
  );
}
