import React from 'react';
import { LifeLinkMasterIcon } from './CustomIcons';

export default function Logo({ size = "default", onClick }) {
  const isSmall = size === "small";

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Combined Logo: Heart + ECG heartbeat + Ambulance */}
      <LifeLinkMasterIcon className={isSmall ? "w-8 h-8 flex-shrink-0" : "w-10 h-10 flex-shrink-0"} />

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-[#3E2723] leading-none ${isSmall ? 'text-lg' : 'text-xl'}`}>
            LIFELINK
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] animate-ping-slow" />
        </div>
        <span className={`font-medium text-[#795548] tracking-tight leading-tight mt-0.5 ${isSmall ? 'text-[10px]' : 'text-[11px]'}`}>
          Connected Care. Saved Lives.
        </span>
      </div>
    </div>
  );
}
