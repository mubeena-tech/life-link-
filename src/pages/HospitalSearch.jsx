import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import StatusBadge from '../components/common/StatusBadge';

export default function HospitalSearch() {
  const { hospitals, navigate, setSelectedHospital } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [modalHospital, setModalHospital] = useState(null);

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.type.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'ICU') return h.facilities.icu.status === 'AVAILABLE';
    if (activeFilter === 'BEDS') return h.facilities.emergencyBed.status === 'AVAILABLE';
    if (activeFilter === 'CARDIOLOGY') return h.facilities.cardiology.status === 'AVAILABLE';
    return true;
  });

  const handleViewDetails = (hospital) => {
    setSelectedHospital(hospital);
    setModalHospital(hospital);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Nearest Hospitals" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hospitals, emergency facilities..."
            className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-white border border-[#EBDED5] text-xs text-[#3E2723] focus:outline-none focus:border-[#5C4035] shadow-inner"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {['ALL', 'BEDS', 'ICU', 'CARDIOLOGY'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition flex-shrink-0 border ${
                activeFilter === f
                  ? 'bg-[#5C4035] text-white border-[#5C4035] shadow-2xs'
                  : 'bg-white text-[#795548] border-[#EBDED5] hover:bg-[#F5EEE6]'
              }`}
            >
              {f === 'ALL' ? 'All Hospitals' : `${f} Available`}
            </button>
          ))}
        </div>

        {/* Hospital List Cards */}
        <div className="space-y-3.5">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card hover:shadow-elevated transition"
            >
              {/* Top Row: Name & Distance */}
              <div className="flex items-start justify-between gap-2 border-b border-[#F5EFEB] pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#2D1E18]">
                      {hospital.name}
                    </h3>
                    {hospital.isRecommended && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black uppercase">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#795548] font-medium block mt-0.5">
                    {hospital.type}
                  </span>
                </div>

                {/* Distance Badge */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-xs font-black text-[#5C4035] flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                  <span>{hospital.distance}</span>
                </div>
              </div>

              {/* Exact Facility Statuses required by Prompt #8:
                  Emergency Bed: AVAILABLE
                  ICU: FULL
                  Oxygen: AVAILABLE
                  ECG: AVAILABLE
                  Cardiology: NOT AVAILABLE */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3.5">
                {/* Emergency Bed */}
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#5C4035]">Emergency Bed</span>
                  <StatusBadge status={hospital.facilities.emergencyBed.status} size="small" />
                </div>

                {/* ICU */}
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#5C4035]">ICU</span>
                  <StatusBadge status={hospital.facilities.icu.status} size="small" />
                </div>

                {/* Oxygen */}
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#5C4035]">Oxygen</span>
                  <StatusBadge status={hospital.facilities.oxygen.status} size="small" />
                </div>

                {/* ECG */}
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#5C4035]">ECG</span>
                  <StatusBadge status={hospital.facilities.ecg.status} size="small" />
                </div>

                {/* Cardiology */}
                <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between col-span-2 sm:col-span-1">
                  <span className="text-[10.5px] font-bold text-[#5C4035]">Cardiology</span>
                  <StatusBadge status={hospital.facilities.cardiology.status} size="small" />
                </div>
              </div>

              {/* Required Buttons: VIEW HOSPITAL DETAILS & CHECK ROUTE */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F5EFEB]">
                <button
                  onClick={() => handleViewDetails(hospital)}
                  className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EEE6] border border-[#EBDED5] text-[11px] font-black text-[#5C4035] transition text-center uppercase tracking-wider"
                >
                  VIEW HOSPITAL DETAILS
                </button>

                <button
                  onClick={() => navigate('live-track')}
                  className="py-2.5 px-3 rounded-xl bg-[#C62828] hover:bg-[#B71C1C] text-white text-[11px] font-black transition text-center uppercase tracking-wider shadow-2xs flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>CHECK ROUTE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Details Modal */}
      {modalHospital && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-[#EBDED5] shadow-2xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-base text-[#3E2723]">{modalHospital.name}</h4>
                <p className="text-xs text-[#795548]">{modalHospital.address}</p>
              </div>
              <button
                onClick={() => setModalHospital(null)}
                className="w-7 h-7 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#795548] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex justify-between">
                <span className="text-[#795548]">Distance from Patient:</span>
                <span className="font-extrabold text-[#3E2723]">{modalHospital.distance} (~{modalHospital.driveTime})</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex justify-between">
                <span className="text-[#795548]">Direct ER Contact:</span>
                <span className="font-extrabold text-[#0284C7]">{modalHospital.phone}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] flex justify-between">
                <span className="text-[#795548]">On-Duty Specialist:</span>
                <span className="font-extrabold text-[#16A34A]">{modalHospital.facilities.specialist.name}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setModalHospital(null);
                  navigate('live-track');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#C62828] text-white font-extrabold text-xs"
              >
                Route to this Hospital
              </button>
              <button
                onClick={() => setModalHospital(null)}
                className="py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-[#5C4035] font-extrabold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
