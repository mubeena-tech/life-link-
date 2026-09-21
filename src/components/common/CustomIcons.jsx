import React from 'react';

// 1. LIFELINK Master Healthcare Logo Icon (Heart + ECG heartbeat + Ambulance)
export function LifeLinkMasterIcon({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Soft rounded background badge */}
      <rect width="100" height="100" rx="24" fill="#C62828" />
      
      {/* Heart Shape */}
      <path
        d="M50 83C50 83 20 64 20 42C20 30.5 28.5 22 39.5 22C45.5 22 49 25.5 50 27C51 25.5 54.5 22 60.5 22C71.5 22 80 30.5 80 42C80 64 50 83 50 83Z"
        fill="white"
      />
      
      {/* ECG Heartbeat Line */}
      <path
        d="M26 44H38L43 31L49 55L54 39L58 47H74"
        stroke="#C62828"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small Ambulance Symbol in lower center */}
      <g transform="translate(35, 52) scale(0.65)">
        <rect x="0" y="8" width="34" height="20" rx="4" fill="#5C4035" />
        <rect x="22" y="11" width="16" height="17" rx="3" fill="#5C4035" />
        <rect x="26" y="13" width="9" height="7" rx="1.5" fill="#FAF7F2" />
        {/* Red emergency cross on ambulance */}
        <path d="M12 14v8M8 18h8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Wheels */}
        <circle cx="10" cy="28" r="4.5" fill="#2A1816" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="31" cy="28" r="4.5" fill="#2A1816" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Emergency Beacon */}
        <circle cx="18" cy="5" r="2.5" fill="#E53935" />
      </g>
    </svg>
  );
}

// 2. Nearest Hospital Icon (Location Pin + Hospital)
export function NearestHospitalIcon({ className = "w-7 h-7 text-[#0284C7]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M24 4C15.163 4 8 11.163 8 20C8 30.5 24 44 24 44C24 44 40 30.5 40 20C40 11.163 32.837 4 24 4Z"
        fill="#E0F2FE"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hospital Building with Cross inside Pin */}
      <rect x="17" y="15" width="14" height="14" rx="2" fill="#0284C7" />
      <path d="M24 18V26M20 22H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 3. Help With AI Icon (Friendly AI Assistant / Robot)
export function HelpWithAIIcon({ className = "w-7 h-7 text-[#7C3AED]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Antenna */}
      <circle cx="24" cy="8" r="3" fill="#7C3AED" />
      <path d="M24 11V16" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
      {/* Robot Head */}
      <rect x="10" y="16" width="28" height="24" rx="8" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2.5" />
      {/* Friendly Robot Eyes */}
      <circle cx="19" cy="26" r="3.5" fill="#7C3AED" />
      <circle cx="29" cy="26" r="3.5" fill="#7C3AED" />
      <circle cx="20" cy="25" r="1.2" fill="white" />
      <circle cx="30" cy="25" r="1.2" fill="white" />
      {/* Friendly Smile */}
      <path d="M20 33C21.5 35 26.5 35 28 33" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      {/* Ear nodes */}
      <rect x="6" y="24" width="4" height="8" rx="2" fill="#7C3AED" />
      <rect x="38" y="24" width="4" height="8" rx="2" fill="#7C3AED" />
    </svg>
  );
}

// 4. Live Track Icon (Map + Ambulance)
export function LiveTrackIcon({ className = "w-7 h-7 text-[#EA580C]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Map outline */}
      <rect x="6" y="8" width="36" height="32" rx="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5" />
      {/* Map route curve */}
      <path
        d="M12 30C16 22 22 26 28 18C32 14 36 18 36 18"
        stroke="#EA580C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      {/* Ambulance mini on route */}
      <g transform="translate(18, 14)">
        <rect x="0" y="4" width="18" height="11" rx="2" fill="#C62828" />
        <rect x="13" y="6" width="7" height="9" rx="1.5" fill="#C62828" />
        <rect x="15" y="7" width="4" height="4" rx="0.5" fill="white" />
        <path d="M7 7v5M4.5 9.5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="5" cy="15" r="2.5" fill="#1E293B" stroke="white" strokeWidth="1" />
        <circle cx="16" cy="15" r="2.5" fill="#1E293B" stroke="white" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 5. Hospital Availability Icon (Hospital + Medical Cross)
export function HospitalAvailabilityIcon({ className = "w-7 h-7 text-[#16A34A]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="12" width="32" height="28" rx="5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
      {/* Medical Cross in hospital center */}
      <rect x="21" y="18" width="6" height="16" rx="1" fill="#16A34A" />
      <rect x="16" y="23" width="16" height="6" rx="1" fill="#16A34A" />
      {/* Roof peak */}
      <path d="M6 14L24 6L42 14" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 6. Check Patient Details Icon (Patient profile + Medical document)
export function PatientDetailsIcon({ className = "w-7 h-7 text-[#5C4035]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Medical clipboard/document background */}
      <rect x="10" y="8" width="28" height="34" rx="4" fill="#F5EEE6" stroke="#5C4035" strokeWidth="2.5" />
      {/* Clip on top */}
      <rect x="18" y="5" width="12" height="6" rx="2" fill="#5C4035" />
      {/* Patient Avatar outline */}
      <circle cx="24" cy="20" r="4.5" fill="#5C4035" />
      <path d="M17 31C17 27 20 26 24 26C28 26 31 27 31 31" fill="#5C4035" />
      {/* Document lines */}
      <path d="M17 35H31M17 38H26" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Large Ambulance Illustration for Emergency Hero
export function HeroAmbulanceGraphic({ className = "w-28 h-20" }) {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ground shadow */}
      <ellipse cx="80" cy="90" rx="65" ry="7" fill="#FBD2CF" />
      
      {/* Ambulance Main Body */}
      <rect x="15" y="28" width="95" height="52" rx="10" fill="white" stroke="#C62828" strokeWidth="3" />
      {/* Cab Front */}
      <path
        d="M108 40L126 50L135 60V80H108V40Z"
        fill="white"
        stroke="#C62828"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Front Windshield */}
      <path
        d="M112 44L124 52L128 62H112V44Z"
        fill="#E0F2FE"
        stroke="#0284C7"
        strokeWidth="1.5"
      />
      
      {/* Red Emergency Stripe */}
      <rect x="16" y="56" width="118" height="9" fill="#C62828" />
      
      {/* Red Cross */}
      <rect x="52" y="36" width="8" height="24" rx="2" fill="#C62828" />
      <rect x="44" y="44" width="24" height="8" rx="2" fill="#C62828" />
      
      {/* LifeLink ID text on side */}
      <text x="22" y="46" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#795548">A01</text>
      
      {/* Siren Light (Animated) */}
      <rect x="68" y="21" width="12" height="7" rx="3" fill="#E53935" className="animate-pulse" />
      <path d="M74 15V19M65 17L68 20M83 17L80 20" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      
      {/* Wheels */}
      <circle cx="45" cy="80" r="12" fill="#2A1816" />
      <circle cx="45" cy="80" r="6" fill="#94A3B8" />
      <circle cx="45" cy="80" r="2.5" fill="#FFFFFF" />

      <circle cx="115" cy="80" r="12" fill="#2A1816" />
      <circle cx="115" cy="80" r="6" fill="#94A3B8" />
      <circle cx="115" cy="80" r="2.5" fill="#FFFFFF" />

      {/* Headlights beam */}
      <polygon points="135,68 158,62 158,78 135,74" fill="#FEF08A" opacity="0.6" />
    </svg>
  );
}
