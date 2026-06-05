import { useLocation, useNavigate } from 'react-router';
import { LogoIcon, SettingsIcon, HomeIcon, GroupIcon, CalendarIcon, ChatBubbleIcon, CreditCardIcon, MoreIcon } from '@/assets/icons';
import drJoseImg from '@/assets/Dr-Jose.png';

interface NavTab {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  path: string;
}

const navTabs: NavTab[] = [
  { icon: HomeIcon, iconWidth: 16, iconHeight: 17, label: 'Overview', path: '/' },
  { icon: GroupIcon, iconWidth: 24, iconHeight: 17, label: 'Patients', path: '/patients' },
  { icon: CalendarIcon, iconWidth: 15, iconHeight: 17, label: 'Schedule', path: '/schedule' },
  { icon: ChatBubbleIcon, iconWidth: 19, iconHeight: 17, label: 'Message', path: '/message' },
  { icon: CreditCardIcon, iconWidth: 22, iconHeight: 17, label: 'Transactions', path: '/transactions' },
];

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="flex items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8 sm:min-h-[72px] sm:w-full sm:rounded-[70px] sm:mt-[18px]"
      style={{
        maxWidth: '1564px',
        height: 'auto',
        minHeight: '56px',
        margin: '12px auto 0',
        width: 'calc(100% - 16px)',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '40px',
      }}
    >
      <div className="flex items-center justify-between w-full gap-1 sm:gap-2 p-[6px_8px] sm:p-[8px_12px]">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={LogoIcon} alt="Logo" className="w-[130px] sm:w-[160px] lg:w-[200px] xl:w-[211px]" style={{ height: 'auto', maxHeight: '48px' }} />
        </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1 sm:gap-1 lg:gap-1 overflow-x-auto scrollbar-none">
        {navTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`nav-btn ${isActive(tab.path) ? 'nav-btn-active' : 'nav-btn-inactive'}`}
          >
            <img src={tab.icon} alt={tab.label} width={tab.iconWidth} height={tab.iconHeight} className="flex-shrink-0 w-auto h-[clamp(16px,1.5vw,17px)]" />
            <span className="hidden sm:inline text-[clamp(11px,1.1vw,14px)]">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Doctor Profile */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 sm:gap-3">
          <img
            src={drJoseImg}
            alt="Dr. Jose Simmons"
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          />
          <div className="text-right hidden md:block">
            <p className="text-body-emphasized text-[clamp(11px,1.1vw,14px)]">Dr. Jose Simmons</p>
            <p className="text-[clamp(10px,0.9vw,12px)] text-gray-500">General Practitioner</p>
          </div>
        </div>
        <div className="divider hidden sm:block" />
        <button className="icon-btn hover:rotate-[15deg]">
          <img src={SettingsIcon} alt="Settings" width={19} height={20} className="w-[17px] h-[18px] lg:w-[19px] lg:h-[20px]" />
        </button>
        <button className="icon-btn ml-1 lg:ml-3">
          <img src={MoreIcon} alt="More" width={4} height={18} className="w-[4px] h-[16px] lg:w-[4px] lg:h-[18px]" />
        </button>
      </div>
      </div>
    </header>
  );
}
