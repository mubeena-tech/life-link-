import React from 'react';
import { Home, ClipboardList, Bell, Building2, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { currentScreen, navigate, notifications } = useApp();
  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: Home,
      target: 'home',
    },
    {
      id: 'history',
      label: 'HISTORY',
      icon: ClipboardList,
      target: 'medical-history',
    },
    {
      id: 'notifications',
      label: 'NOTIFICATIONS',
      icon: Bell,
      target: 'notifications',
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      id: 'hospital',
      label: 'HOSPITAL',
      icon: Building2,
      target: 'hospital-search',
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      icon: Settings,
      target: 'settings',
    },
  ];

  // Helper to test if item is active
  const isActive = (item) => {
    if (item.id === 'home' && currentScreen === 'home') return true;
    if (item.id === 'history' && (currentScreen === 'medical-history' || currentScreen === 'history-details')) return true;
    if (item.id === 'notifications' && currentScreen === 'notifications') return true;
    if (item.id === 'hospital' && (currentScreen === 'hospital-search' || currentScreen === 'hospital-availability' || currentScreen === 'hospital-dashboard')) return true;
    if (item.id === 'settings' && currentScreen === 'settings') return true;
    return false;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#5C4035] text-white border-t border-[#7B5E4F] shadow-elevated transition-all"
      style={{ maxWidth: 'inherit', margin: '0 auto' }}
      aria-label="Bottom Navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.target)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl relative ${
                active
                  ? 'text-white font-black scale-105'
                  : 'text-[#D5C2B4] hover:text-white font-semibold'
              }`}
            >
              {/* Active Indicator Backdrop Pill */}
              {active && (
                <div className="absolute inset-0 bg-[#4A2E2B]/90 rounded-xl -z-10 shadow-inner border border-[#8D6E63]/40" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <Icon
                  className={`transition-transform duration-200 ${
                    active ? 'w-5 h-5 text-[#FAF7F2] stroke-[2.5]' : 'w-5 h-5 stroke-[1.8]'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#E53935] text-white text-[9px] font-black flex items-center justify-center border-2 border-[#5C4035] shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[9.5px] tracking-wider mt-1 leading-none ${
                  active ? 'text-[#FAF7F2] font-black' : 'text-[#D5C2B4]'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot indicator */}
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] mt-0.5 shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
