import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LogoIcon, SettingsIcon, HomeIcon, GroupIcon, CalendarIcon, ChatBubbleIcon, CreditCardIcon, MoreIcon } from '@/assets/icons';
import { cn } from '@/lib/utils';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close the mobile menu on Escape and lock body scroll while it is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="mx-auto mt-3 flex min-h-[56px] w-[calc(100%-16px)] max-w-[1564px] items-center justify-between rounded-[40px] bg-white px-3 py-1.5 shadow-sm sm:min-h-[72px] sm:rounded-[70px] sm:px-4 sm:py-2 lg:px-6">
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2 p-[6px_8px] sm:p-[8px_12px]">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src={LogoIcon}
              alt="Logo"
              className="w-[100px] xs:w-[130px] sm:w-[160px] lg:w-[200px] xl:w-[211px]"
              style={{ height: 'auto', maxHeight: '36px' }}
            />
          </div>

          {/* Desktop Navigation Tabs */}
          <nav aria-label="Primary" className="hidden items-center gap-1 overflow-x-auto scrollbar-none md:flex">
            {navTabs.map((tab) => {
              const active = isActive(tab.path);
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => handleNav(tab.path)}
                  aria-current={active ? 'page' : undefined}
                  className={cn('nav-btn relative', active ? 'text-navy' : 'nav-btn-inactive')}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-[#01F0D0]"
                    />
                  )}
                  <img
                    src={tab.icon}
                    alt=""
                    width={tab.iconWidth}
                    height={tab.iconHeight}
                    className="relative z-10 h-[clamp(16px,1.5vw,17px)] w-auto shrink-0"
                  />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Doctor Profile */}
          <div className="hidden md:flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-3">
              <img
                src={drJoseImg}
                alt="Dr. Jose Simmons"
                className="w-8 h-8 lg:w-10 lg:h-10"
              />
              <div className="text-right hidden lg:block">
                <p className="text-body-emphasized text-sm">Dr. Jose Simmons</p>
                <p className="text-xs text-gray-500">General Practitioner</p>
              </div>
            </div>
            <div className="divider" />
            <button className="icon-btn hover:rotate-[15deg]">
              <img src={SettingsIcon} alt="Settings" width={19} height={20} className="w-[19px] h-[20px]" />
            </button>
            <button className="icon-btn ml-3">
              <img src={MoreIcon} alt="More" width={4} height={18} className="w-[4px] h-[18px]" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-navy hover:bg-gray-100 transition-colors duration-150"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 md:hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <img
                  src={LogoIcon}
                  alt="Logo"
                  className="w-[120px]"
                  style={{ height: 'auto', maxHeight: '32px' }}
                />
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-navy hover:bg-gray-100 transition-colors duration-150"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Doctor Profile */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                <img src={drJoseImg} alt="Dr. Jose Simmons" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-navy">Dr. Jose Simmons</p>
                  <p className="text-xs text-gray-500">General Practitioner</p>
                </div>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navTabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => handleNav(tab.path)}
                    aria-current={isActive(tab.path) ? 'page' : undefined}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                      isActive(tab.path)
                        ? 'bg-teal-light text-navy font-bold'
                        : 'text-gray-600 font-medium hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      width={24}
                      height={20}
                      className="flex-shrink-0 w-auto h-5"
                    />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors duration-150">
                    <img src={SettingsIcon} alt="Settings" width={18} height={18} />
                    Settings
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors duration-150">
                    <img src={MoreIcon} alt="More" width={4} height={16} />
                    More
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
