import React, { useState } from 'react';
import {
  Building2,
  Bed,
  HeartPulse,
  Wind,
  Activity,
  UserCheck,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import StatusBadge from '../components/common/StatusBadge';

export default function HospitalAvailability() {
  const { hospitals, navigate } = useApp();
  const [lastRefreshed, setLastRefreshed] = useState('Just now');
  const [reservedHospital, setReservedHospital] = useState('HOSP-02'); // Government Hospital B

  const handleRefresh = () => {
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Hospital Facility Matrix" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Header Bar with Live Sync */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#5C4035]">
              Real-Time Emergency Capacity
            </h2>
            <span className="text-[11px] text-[#8D6E63]">
              Synced with regional hospital telemetry
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-[#EBDED5] text-[11px] font-bold text-[#5C4035] hover:bg-[#F5EEE6] transition shadow-2xs"
          >
            <RefreshCw className="w-3 h-3 text-[#5C4035]" />
            <span>{lastRefreshed}</span>
          </button>
        </div>

        {/* Matrix Cards for Hospitals */}
        <div className="space-y-4">
          {hospitals.map((hospital) => {
            const isReserved = reservedHospital === hospital.id;

            return (
              <div
                key={hospital.id}
                className={`rounded-3xl bg-white border p-4 shadow-card transition-all ${
                  isReserved ? 'border-[#C62828] ring-2 ring-[#C62828]/20' : 'border-[#EBDED5]'
                }`}
              >
                {/* Hospital Title Row */}
                <div className="flex items-start justify-between gap-2 border-b border-[#F5EFEB] pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-[#2D1E18]">
                        {hospital.name}
                      </h3>
                      {isReserved && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#C62828] text-[9px] font-black uppercase">
                          Active Allocation
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#795548] font-medium block mt-0.5">
                      {hospital.type} • {hospital.distance}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-xs font-black text-[#5C4035]">
                    {hospital.facilities.emergencyBed.count} Beds Open
                  </span>
                </div>

                {/* 6 Key Emergency Facilities Specified in Prompt:
                    1. Emergency Bed
                    2. ICU
                    3. Oxygen
                    4. Ventilator
                    5. ECG
                    6. Specialist */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {/* 1. Emergency Bed */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">Emergency Bed</span>
                      <Bed className="w-3.5 h-3.5 text-[#5C4035]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2D1E18]">
                        {hospital.facilities.emergencyBed.count} Available
                      </span>
                      <StatusBadge status={hospital.facilities.emergencyBed.status} size="small" />
                    </div>
                  </div>

                  {/* 2. ICU */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">ICU</span>
                      <HeartPulse className="w-3.5 h-3.5 text-[#C62828]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2D1E18]">
                        {hospital.facilities.icu.count} Available
                      </span>
                      <StatusBadge status={hospital.facilities.icu.status} size="small" />
                    </div>
                  </div>

                  {/* 3. Oxygen */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">Oxygen</span>
                      <Wind className="w-3.5 h-3.5 text-[#0284C7]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2D1E18]">
                        {hospital.facilities.oxygen.count} Cylinders
                      </span>
                      <StatusBadge status={hospital.facilities.oxygen.status} size="small" />
                    </div>
                  </div>

                  {/* 4. Ventilator */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">Ventilator</span>
                      <Activity className="w-3.5 h-3.5 text-[#7C3AED]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2D1E18]">
                        {hospital.facilities.ventilator.count} Units
                      </span>
                      <StatusBadge status={hospital.facilities.ventilator.status} size="small" />
                    </div>
                  </div>

                  {/* 5. ECG */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">ECG</span>
                      <HeartPulse className="w-3.5 h-3.5 text-[#EA580C]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2D1E18]">
                        {hospital.facilities.ecg.count} Systems
                      </span>
                      <StatusBadge status={hospital.facilities.ecg.status} size="small" />
                    </div>
                  </div>

                  {/* 6. Specialist */}
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#795548] uppercase">Specialist</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-[11px] text-[#2D1E18] truncate pr-1">
                        {hospital.facilities.specialist.name}
                      </span>
                      <StatusBadge status={hospital.facilities.specialist.status} size="small" />
                    </div>
                  </div>
                </div>

                {/* Reservation Action */}
                <div className="mt-3 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                  <span className="text-[11px] text-[#795548]">
                    ER Phone: <strong className="text-[#3E2723]">{hospital.phone}</strong>
                  </span>

                  <button
                    onClick={() => {
                      setReservedHospital(hospital.id);
                      navigate('live-track');
                    }}
                    className={`py-1.5 px-3 rounded-xl text-xs font-black transition ${
                      isReserved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#5C4035] hover:bg-[#4A2E2B] text-white shadow-2xs'
                    }`}
                  >
                    {isReserved ? '✓ Bed Reserved (En Route)' : 'Reserve Bed & Route'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
