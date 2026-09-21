import React from 'react';
import {
  Navigation,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle,
  Building2,
  ChevronDown,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import MapView from '../components/common/MapView';

export default function LiveTrack() {
  const { ambulance, patient, navigate } = useApp();

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Live Ambulance Tracking" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Real Leaflet Map Container */}
        <MapView className="h-64 sm:h-72 w-full" />

        {/* Real-time Status Card with Ambulance A01, ETA 9 min, Distance 4.2 km */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF5F5] border border-[#FBD2CF] flex items-center justify-center text-xl shadow-2xs">
                🚑
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase text-[#8D6E63]">Ambulance</span>
                  <span className="text-sm font-black text-[#C62828]">{ambulance.id}</span>
                </div>
                <span className="text-[11px] font-bold text-neutral-600">
                  {ambulance.type}
                </span>
              </div>
            </div>

            {/* Status: En Route */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              {ambulance.status}
            </span>
          </div>

          {/* Quick Metrics: ETA 9 mins, Distance 4.2 km, Speed */}
          <div className="grid grid-cols-2 gap-3 text-center mb-3">
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">
                Estimated Arrival
              </span>
              <span className="text-xl font-black text-[#C62828] block mt-0.5">
                {ambulance.eta}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">
                Distance Remaining
              </span>
              <span className="text-xl font-black text-[#3E2723] block mt-0.5">
                {ambulance.distance}
              </span>
            </div>
          </div>

          {/* Required Flow Representation: Patient Location -> Ambulance -> Hospital */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] space-y-2">
            <span className="text-[10px] font-extrabold text-[#795548] uppercase tracking-wider block">
              Emergency Transit Vector:
            </span>

            <div className="flex flex-col items-start gap-1 text-xs">
              {/* Patient Location */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 text-[#C62828] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  P
                </div>
                <span className="font-bold text-[#3E2723]">
                  Patient Location: <span className="font-medium text-[#795548]">{patient.incidentDetails.location}</span>
                </span>
              </div>

              {/* Arrow Down */}
              <div className="w-6 flex justify-center text-[#8D6E63] font-bold text-xs pl-0.5">
                ↓
              </div>

              {/* Ambulance */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  A
                </div>
                <span className="font-bold text-[#3E2723]">
                  Ambulance: <span className="font-medium text-[#795548]">Unit {ambulance.id} (En Route)</span>
                </span>
              </div>

              {/* Arrow Down */}
              <div className="w-6 flex justify-center text-[#8D6E63] font-bold text-xs pl-0.5">
                ↓
              </div>

              {/* Hospital */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  H
                </div>
                <span className="font-bold text-[#3E2723]">
                  Destination Hospital: <span className="font-medium text-[#795548]">{ambulance.hospitalDestination}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Driver & Paramedic Team Card */}
          <div className="mt-3 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#5C4035] text-white flex items-center justify-center text-xs font-bold">
                RK
              </div>
              <div>
                <span className="text-xs font-bold text-[#3E2723] block">
                  {ambulance.driverName} (Driver)
                </span>
                <span className="text-[11px] text-[#795548]">
                  EMT Paramedic: {ambulance.paramedicName}
                </span>
              </div>
            </div>

            <a
              href={`tel:${ambulance.driverPhone}`}
              className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition shadow-2xs"
              title="Call driver"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Action button to view digital handover sheet */}
        <button
          onClick={() => navigate('digital-handover')}
          className="w-full py-3 px-4 rounded-2xl bg-[#5C4035] hover:bg-[#4A2E2B] text-white font-black text-xs uppercase tracking-wider shadow-card transition text-center"
        >
          View Paramedic-to-ER Handover Sheet
        </button>
      </div>
    </div>
  );
}
