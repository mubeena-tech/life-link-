import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Bell,
  Globe,
  Lock,
  WifiOff,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';

export default function Settings() {
  const { patient, navigate } = useApp();
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifsEnabled, setNotifsEnabled] = useState(true);
  const [gpsPrecision, setGpsPrecision] = useState(true);
  const [language, setLanguage] = useState('English (EN)');

  const settingsItems = [
    {
      id: 'profile',
      label: 'Profile',
      description: `${patient.name} (${patient.id}) • B+`,
      icon: User,
      action: () => navigate('patient-details'),
    },
    {
      id: 'emergency-contacts',
      label: 'Emergency Contacts',
      description: patient.emergencyContact,
      icon: Phone,
      action: () => navigate('patient-details'),
    },
    {
      id: 'location',
      label: 'Location Settings',
      description: 'Simulated GPS & Geofencing Active',
      icon: MapPin,
      toggle: {
        value: gpsPrecision,
        onChange: () => setGpsPrecision(!gpsPrecision)
      }
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Sound, priority sirens & push alerts',
      icon: Bell,
      toggle: {
        value: notifsEnabled,
        onChange: () => setNotifsEnabled(!notifsEnabled)
      }
    },
    {
      id: 'language',
      label: 'Language',
      description: language,
      icon: Globe,
      action: () => {
        setLanguage(prev => prev.includes('English') ? 'Hindi (हिन्दी)' : 'English (EN)');
      }
    },
    {
      id: 'privacy',
      label: 'Privacy',
      description: 'Encrypted medical health locker',
      icon: Lock,
      action: () => alert('LifeLink uses HIPAA/DISHA encrypted telemetry for simulated patient data.'),
    },
    {
      id: 'offline-mode',
      label: 'Offline Mode',
      description: 'Store vital profile & SMS fallback offline',
      icon: WifiOff,
      toggle: {
        value: offlineMode,
        onChange: () => setOfflineMode(!offlineMode)
      }
    },
    {
      id: 'about',
      label: 'About LIFELINK',
      description: 'Connected Care. Saved Lives.',
      icon: Info,
      action: () => alert('LIFELINK Emergency Platform v1.0.0\nStudent Hackathon Demonstration Prototype.'),
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Settings" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Settings Group */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-2 shadow-card divide-y divide-[#F5EFEB]">
          {settingsItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={item.action}
                className={`p-3.5 flex items-center justify-between gap-3 transition ${
                  item.action ? 'hover:bg-[#FAF7F2] cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#F5EEE6] border border-[#EBDED5] flex items-center justify-center text-[#5C4035] flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm text-[#2D1E18] block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#795548] font-medium block mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Right Toggle or Chevron */}
                {item.toggle ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      item.toggle.onChange();
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      item.toggle.value ? 'bg-[#5C4035]' : 'bg-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        item.toggle.value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#8D6E63]" />
                )}
              </div>
            );
          })}
        </div>

        {/* About App Card */}
        <div className="rounded-3xl bg-[#FAF7F2] border border-[#EBDED5] p-4 text-center space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-center gap-1 font-black text-sm text-[#3E2723]">
            <span>LIFELINK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
            <span className="text-[10px] text-[#8D6E63] font-medium">v1.0.0</span>
          </div>
          <p className="text-xs text-[#795548] font-semibold">
            “Connected Care. Saved Lives.”
          </p>
          <span className="text-[10px] text-neutral-500 block pt-1">
            Student Hackathon Healthcare Prototype • MIT License
          </span>
        </div>
      </div>
    </div>
  );
}
