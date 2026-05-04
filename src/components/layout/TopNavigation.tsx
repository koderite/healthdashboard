import { LogoIcon, SettingsIcon, HomeIcon, GroupIcon, CalendarIcon, ChatBubbleIcon, CreditCardIcon, MoreIcon } from '@/assets/icons';
import drJoseImg from '@/assets/Dr-Jose.png';

interface NavTab {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  active?: boolean;
}

const navTabs: NavTab[] = [
  { icon: HomeIcon, iconWidth: 16, iconHeight: 17, label: 'Overview' },
  { icon: GroupIcon, iconWidth: 24, iconHeight: 17, label: 'Patients', active: true },
  { icon: CalendarIcon, iconWidth: 15, iconHeight: 17, label: 'Schedule' },
  { icon: ChatBubbleIcon, iconWidth: 19, iconHeight: 17, label: 'Message' },
  { icon: CreditCardIcon, iconWidth: 22, iconHeight: 17, label: 'Transactions' },
];

export function TopNavigation() {
  return (
    <header
      className="flex items-center justify-between px-8  "
      style={{
        maxWidth: '1564px',
        height: '72px',
        margin: '18px auto 0',
        width: '100%',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius: '70px',
      }}
    >
      <div style={{ padding: '12px' }} className="flex items-center justify-between w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <img src={LogoIcon} alt="Logo" style={{ width: '211px', height: '48px' }} />
        </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1">
        {navTabs.map((tab) => (
          <button
            key={tab.label}
            className={`nav-btn ${tab.active ? 'nav-btn-active' : 'nav-btn-inactive'}`}
          >
            <img src={tab.icon} alt={tab.label} width={tab.iconWidth} height={tab.iconHeight} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Doctor Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            src={drJoseImg}
            alt="Dr. Jose Simmons"
            style={{ width: '44px', height: '44px' }}
          />
          <div className="text-right">
            <p className="text-body-emphasized">Dr. Jose Simmons</p>
            <p className="text-xs text-gray-500">General Practitioner</p>
          </div>
        </div>
        <div className="divider" />
        <button className="icon-btn hover:rotate-[15deg]">
          <img src={SettingsIcon} alt="Settings" width={19} height={20} />
        </button>
        <button className="icon-btn ml-3">
          <img src={MoreIcon} alt="More" width={4} height={18} />
        </button>
      </div>
      </div>
    </header>
  );
}
