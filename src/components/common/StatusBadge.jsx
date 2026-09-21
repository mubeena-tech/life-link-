import React from 'react';

export default function StatusBadge({ status, size = "default" }) {
  const normStatus = (status || "").toUpperCase();

  const isSmall = size === "small";

  const getStyle = () => {
    switch (normStatus) {
      case 'AVAILABLE':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'FULL':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };
      case 'LIMITED':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'NOT AVAILABLE':
        return {
          bg: 'bg-neutral-100 text-neutral-600 border-neutral-200',
          dot: 'bg-neutral-400',
        };
      case 'CRITICAL':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-600 animate-ping',
        };
      case 'EN ROUTE':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          dot: 'bg-orange-500 animate-pulse',
        };
      case 'ONLINE':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500 animate-pulse',
        };
      default:
        return {
          bg: 'bg-[#F5EEE6] text-[#5C4035] border-[#EBDED5]',
          dot: 'bg-[#8D6E63]',
        };
    }
  };

  const style = getStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border ${style.bg} ${
        isSmall ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10.5px]'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} flex-shrink-0`} />
      <span>{status}</span>
    </span>
  );
}
