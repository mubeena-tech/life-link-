import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function FeatureCard({
  title,
  text,
  icon,
  actionText = "View",
  onClick,
  badge = null,
  facilityIndicators = null,
  colorScheme = "brown", // brown, blue, purple, orange, green
  fullWidth = false,
}) {
  const getSchemeStyles = () => {
    switch (colorScheme) {
      case 'blue':
        return {
          bg: 'bg-white',
          border: 'border-[#E2E8F0]',
          hoverBorder: 'hover:border-[#93C5FD]',
          iconBg: 'bg-[#EFF6FF]',
          btnBg: 'text-[#0284C7] hover:text-[#0369A1]',
          btnPill: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
        };
      case 'purple':
        return {
          bg: 'bg-white',
          border: 'border-[#E2E8F0]',
          hoverBorder: 'hover:border-[#C4B5FD]',
          iconBg: 'bg-[#FAF5FF]',
          btnBg: 'text-[#7C3AED] hover:text-[#6D28D9]',
          btnPill: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
        };
      case 'orange':
        return {
          bg: 'bg-white',
          border: 'border-[#E2E8F0]',
          hoverBorder: 'hover:border-[#FDBA74]',
          iconBg: 'bg-[#FFF7ED]',
          btnBg: 'text-[#EA580C] hover:text-[#C2410C]',
          btnPill: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
        };
      case 'green':
        return {
          bg: 'bg-white',
          border: 'border-[#E2E8F0]',
          hoverBorder: 'hover:border-[#86EFAC]',
          iconBg: 'bg-[#F0FDF4]',
          btnBg: 'text-[#16A34A] hover:text-[#15803D]',
          btnPill: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
        };
      case 'brown':
      default:
        return {
          bg: 'bg-white',
          border: 'border-[#EBDED5]',
          hoverBorder: 'hover:border-[#A88E7D]',
          iconBg: 'bg-[#F5EEE6]',
          btnBg: 'text-[#5C4035] hover:text-[#3D2522]',
          btnPill: 'bg-[#FAF7F2] text-[#5C4035] border-[#EBDED5]',
        };
    }
  };

  const scheme = getSchemeStyles();

  return (
    <div
      onClick={onClick}
      className={`group rounded-3xl ${scheme.bg} border ${scheme.border} ${scheme.hoverBorder} p-3.5 sm:p-4 shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.985] ${
        fullWidth ? 'col-span-2' : ''
      }`}
    >
      <div>
        {/* Header row with Icon and Optional Badge */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className={`w-11 h-11 rounded-2xl ${scheme.iconBg} flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
            {icon}
          </div>

          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E53935] text-white animate-pulse shadow-2xs">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-[13.5px] sm:text-[14.5px] text-[#2D1E18] tracking-tight leading-snug group-hover:text-[#5C4035] transition-colors">
          {title}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-[11px] text-[#795548] font-medium leading-normal mt-1 mb-2">
          {text}
        </p>

        {/* Optional Facility Indicators (For Hospital Availability Card) */}
        {facilityIndicators && facilityIndicators.length > 0 && (
          <div className="my-2.5 flex flex-wrap gap-1">
            {facilityIndicators.map((fac, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F5EEE6] border border-[#EBDED5] text-[#4A2E2B] text-[9.5px] font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                {fac}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Button / Arrow */}
      <div className="pt-2 border-t border-[#F5EFEB] mt-auto">
        <div
          className={`inline-flex items-center justify-between w-full py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all ${scheme.btnPill} group-hover:shadow-2xs`}
        >
          <span>{actionText}</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
