import React from 'react';
import { User, ChevronLeft, Bell, HeartPulse } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';

export default function Header({ title, showBack = false }) {
  const { currentScreen, navigate, goBack, notifications, emergencyStatus, triggerEmergency } = useApp();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBDED5] px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Logo or Back Button */}
        {showBack ? (
          <div className="flex items-center gap-2">
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-white border border-[#EBDED5] flex items-center justify-center text-[#5C4035] hover:bg-[#F5EEE6] active:scale-95 transition shadow-2xs"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-[#3E2723] text-base truncate">
              {title || 'LIFELINK'}
            </span>
          </div>
        ) : (
          <Logo onClick={() => navigate('home')} />
        )}

        {/* Right Side: Quick Emergency Pill + Notifications + Profile Icon */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Subtle Emergency SOS Quick Trigger if on subpages */}
          {emergencyStatus === 'idle' && currentScreen !== 'home' && currentScreen !== 'emergency-call' && (
            <button
              onClick={triggerEmergency}
              className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF5F5] border border-[#FBD2CF] text-[#C62828] text-xs font-extrabold hover:bg-[#FDECEB] transition"
            >
              <HeartPulse className="w-3.5 h-3.5 text-[#E53935]" />
              <span>SOS</span>
            </button>
          )}

          {/* Notifications Bell */}
          <button
            onClick={() => navigate('notifications')}
            className="relative w-9 h-9 rounded-full bg-white border border-[#EBDED5] flex items-center justify-center text-[#5C4035] hover:bg-[#F5EEE6] active:scale-95 transition shadow-2xs"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C62828] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile / User Icon (Top-right requirement) */}
          <button
            onClick={() => navigate('patient-details')}
            className="w-9 h-9 rounded-full bg-[#5C4035] border-2 border-white flex items-center justify-center text-white hover:bg-[#4A2E2B] active:scale-95 transition shadow-2xs"
            aria-label="View patient profile"
            title="Ravi Kumar (LL-10452)"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
