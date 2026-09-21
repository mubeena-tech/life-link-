import React from 'react';
import {
  Bell,
  Clock,
  CheckCircle2,
  Building2,
  Share2,
  Wifi,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';

export default function Notifications() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate
  } = useApp();

  const getIconForNotification = (type) => {
    switch (type) {
      case 'ambulance':
        return <span className="text-base">🚑</span>;
      case 'hospital':
        return <Building2 className="w-4 h-4 text-[#0284C7]" />;
      case 'tracking':
        return <Clock className="w-4 h-4 text-[#EA580C]" />;
      case 'handover':
        return <Share2 className="w-4 h-4 text-[#16A34A]" />;
      case 'system':
      default:
        return <Wifi className="w-4 h-4 text-[#5C4035]" />;
    }
  };

  const handleClickNotification = (n) => {
    markNotificationRead(n.id);
    if (n.type === 'ambulance' || n.type === 'tracking') {
      navigate('live-track');
    } else if (n.type === 'hospital') {
      navigate('hospital-search');
    } else if (n.type === 'handover') {
      navigate('digital-handover');
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Notifications" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#5C4035]">
            Emergency Dispatch Feed
          </span>
          <button
            onClick={markAllNotificationsRead}
            className="text-[11px] font-extrabold text-[#5C4035] hover:text-[#C62828] transition"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications List matching Prompt #12:
            - Ambulance A01 has been dispatched.
            - Hospital B has received the emergency alert.
            - Ambulance ETA updated to 9 minutes.
            - Patient handover completed. */}
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClickNotification(notif)}
              className={`rounded-2xl p-3.5 border transition cursor-pointer flex items-start gap-3 shadow-card active:scale-[0.99] ${
                notif.unread
                  ? 'bg-white border-[#FBD2CF] ring-1 ring-[#C62828]/20'
                  : 'bg-white/80 border-[#EBDED5]'
              }`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-center flex-shrink-0 shadow-2xs">
                {getIconForNotification(notif.type)}
              </div>

              {/* Text Body */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-extrabold text-xs sm:text-[13px] text-[#2D1E18]">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-[#8D6E63] font-medium flex-shrink-0">
                    {notif.time}
                  </span>
                </div>

                <p className="text-xs text-[#5C4035] mt-1 leading-snug">
                  {notif.message}
                </p>
              </div>

              {/* Unread indicator dot */}
              {notif.unread && (
                <span className="w-2 h-2 rounded-full bg-[#C62828] flex-shrink-0 self-center" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
