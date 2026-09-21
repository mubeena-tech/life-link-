import React from 'react';
import { PhoneCall, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroAmbulanceGraphic } from './CustomIcons';

export default function EmergencyCard() {
  const { triggerEmergency } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#FDECEB] border-2 border-[#FBD2CF] p-4 sm:p-5 shadow-card transition-all hover:shadow-emergency">
      {/* Background soft red gradient highlight */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-gradient-to-bl from-[#FBD2CF]/60 to-transparent rounded-full pointer-events-none blur-xl" />

      <div className="relative z-10">
        {/* Top Header Row with Ambulance graphic & Title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF5F5] border border-[#FBD2CF] text-[#C62828] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E53935] animate-ping" />
              Emergency Service
            </div>

            <h2 className="text-2xl sm:text-[26px] font-black text-[#8E1313] tracking-tight leading-none mb-1.5">
              Emergency?
            </h2>

            <p className="text-xs sm:text-[13px] font-medium text-[#7A1F1D] leading-relaxed">
              Request emergency help in seconds.
            </p>
          </div>

          {/* Large Ambulance Illustration */}
          <div className="flex-shrink-0 self-center">
            <HeroAmbulanceGraphic className="w-24 h-16 sm:w-28 sm:h-20 drop-shadow-sm" />
          </div>
        </div>

        {/* Most Prominent Action Button: CALL EMERGENCY */}
        <div className="mt-4 pt-1">
          <button
            onClick={triggerEmergency}
            id="call-emergency-btn"
            className="group w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#C62828] via-[#D32F2F] to-[#E53935] text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-emergency hover:brightness-105 active:scale-[0.98] transition-all duration-200 animate-emergency-glow"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-4 h-4 text-white animate-bounce" />
            </div>
            <span className="tracking-wider uppercase">CALL EMERGENCY</span>
            <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Prototype Safety Notice */}
        <div className="mt-2.5 flex items-center justify-center gap-1 text-center text-[10px] text-[#A84842] font-semibold">
          <AlertCircle className="w-3 h-3 text-[#C62828] flex-shrink-0" />
          <span>Simulated emergency dispatch function for hackathon demonstration.</span>
        </div>
      </div>
    </div>
  );
}
