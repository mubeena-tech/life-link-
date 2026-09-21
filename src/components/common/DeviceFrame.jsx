import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, AlertCircle, HeartPulse } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DeviceFrame({ children }) {
  const { viewMode, setViewMode, triggerEmergency } = useApp();
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#241A18] text-[#3E2723] flex flex-col items-center justify-start py-2 sm:py-6 px-1 sm:px-4">
      {/* Top Demo Bar (Device Mode Switcher & Hackathon Disclaimer) */}
      <div className="w-full max-w-4xl mb-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-[#362623]/90 backdrop-blur-md rounded-2xl border border-[#523B36] text-white text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold tracking-wide text-[#FAF7F2]">LIFELINK DEMO</span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline text-neutral-300 text-[11px]">
            Connected Care. Saved Lives.
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-[#251917] p-1 rounded-xl border border-[#44302C]">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition ${
              viewMode === 'mobile'
                ? 'bg-[#C62828] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
            title="Mobile Viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition ${
              viewMode === 'tablet'
                ? 'bg-[#C62828] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
            title="Tablet Viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewMode('fluid')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition ${
              viewMode === 'fluid'
                ? 'bg-[#C62828] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
            title="Full Responsive Dashboard"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive</span>
          </button>
        </div>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="w-full max-w-4xl mb-3 px-3 py-1.5 bg-[#3D2522]/80 rounded-xl border border-[#C62828]/40 text-[#FBD2CF] text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#F87171] flex-shrink-0" />
          <span>Student Hackathon Prototype: All emergency services, GPS coordinates, and patient details are simulated.</span>
        </div>
        <button
          onClick={triggerEmergency}
          className="hidden sm:flex items-center gap-1 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold px-2.5 py-0.5 rounded-lg text-[10px] uppercase tracking-wider transition shadow-2xs"
        >
          <HeartPulse className="w-3 h-3" />
          Quick SOS
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`relative transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'w-full max-w-[425px] rounded-[44px] ring-[12px] ring-[#120D0C] shadow-2xl border-[4px] border-[#3F3330] overflow-hidden bg-[#FAF7F2]'
            : viewMode === 'tablet'
            ? 'w-full max-w-[768px] rounded-[36px] ring-[10px] ring-[#120D0C] shadow-2xl border-[3px] border-[#3F3330] overflow-hidden bg-[#FAF7F2]'
            : 'w-full max-w-5xl rounded-3xl shadow-2xl border border-[#44302C] overflow-hidden bg-[#FAF7F2]'
        }`}
        style={{ minHeight: viewMode === 'mobile' ? '860px' : '820px' }}
      >
        {/* iPhone Status Bar (only shown in mobile frame) */}
        {viewMode === 'mobile' && (
          <div className="sticky top-0 z-50 bg-[#FAF7F2] pt-2 px-7 pb-1 flex items-center justify-between text-xs font-semibold text-[#2B1B18] select-none">
            {/* Clock */}
            <span className="font-bold text-[13px] tracking-tight">{currentTime}</span>

            {/* Dynamic Island / Notch */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0369a1]/70" />
            </div>

            {/* Icons: Cell, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-neutral-800">
              {/* Signal */}
              <svg className="w-4 h-3.5" viewBox="0 0 16 12" fill="currentColor">
                <rect x="1" y="8" width="2" height="4" rx="0.5" />
                <rect x="4" y="6" width="2" height="6" rx="0.5" />
                <rect x="7" y="4" width="2" height="8" rx="0.5" />
                <rect x="10" y="1" width="2" height="11" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.24-2.83a6 6 0 018.48 0 .75.75 0 101.06-1.06 7.5 7.5 0 00-10.6 0 .75.75 0 101.06 1.06zm-2.83-2.83a10 10 0 0114.14 0 .75.75 0 101.06-1.06 11.5 11.5 0 00-16.26 0 .75.75 0 101.06 1.06z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 border border-neutral-700 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-neutral-900 rounded-[1px]" />
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <main className="min-h-[820px] pb-24 bg-[#FAF7F2]">{children}</main>

        {/* iPhone Home Indicator Bar */}
        {viewMode === 'mobile' && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-400/70 rounded-full pointer-events-none z-50" />
        )}
      </div>
    </div>
  );
}
