import React from 'react';
import {
  Building2,
  Users,
  Activity,
  Bed,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import StatusBadge from '../components/common/StatusBadge';

export default function HospitalDashboard() {
  const { patient, ambulance, navigate } = useApp();

  return (
    <div className="flex flex-col min-h-full">
      <Header title="ER Receiving Console" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Hospital Facility Banner */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] block">
                Emergency Department Console
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#2D1E18]">
                Government Hospital B (Trauma Center)
              </h2>
              <span className="text-xs text-[#795548]">
                Duty Physician: Dr. Priya Nair (Emergency Medicine)
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
              ER STATUS: READY
            </span>
          </div>
        </div>

        {/* Incoming Emergency Inbound Alert (Ravi Kumar via Ambulance A01) */}
        <div className="rounded-3xl bg-[#FFF5F5] border-2 border-[#FBD2CF] p-4 shadow-card">
          <div className="flex items-center justify-between border-b border-[#FBD2CF] pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#C62828] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E53935] animate-ping" />
              Inbound Trauma Case (Red Level 1)
            </div>
            <span className="text-xs font-black text-[#C62828]">
              ETA: {ambulance.eta}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8D6E63] font-medium">Patient:</span>
              <span className="font-extrabold text-[#3E2723]">
                {patient.name} ({patient.id}) • {patient.age}y / {patient.bloodGroup}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8D6E63] font-medium">Complaint:</span>
              <span className="font-extrabold text-[#C62828]">{patient.incidentDetails.reason}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8D6E63] font-medium">Dispatched Unit:</span>
              <span className="font-bold text-[#3E2723]">
                Ambulance {ambulance.id} (Paramedic: {ambulance.paramedicName})
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8D6E63] font-medium">Assigned Bed:</span>
              <span className="font-bold text-emerald-800">
                Trauma Resuscitation Bay 1 (Prepped)
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#FBD2CF] flex gap-2">
            <button
              onClick={() => navigate('live-track')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#C62828] text-white text-xs font-bold shadow-2xs hover:bg-[#B71C1C]"
            >
              Monitor GPS Transit
            </button>
            <button
              onClick={() => navigate('digital-handover')}
              className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#FBD2CF] text-[#C62828] text-xs font-bold hover:bg-[#FDECEB]"
            >
              Review Handover Sheet
            </button>
          </div>
        </div>

        {/* Current Bed Occupancy Summary */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5C4035] mb-3 flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#5C4035]" />
            Hospital B Active Capacity
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] text-[#8D6E63] font-bold uppercase">Trauma Bays</span>
              <div className="font-black text-sm text-[#3E2723] mt-0.5">3 / 4</div>
              <span className="text-[9px] text-emerald-700 font-bold">1 Reserved</span>
            </div>

            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] text-[#8D6E63] font-bold uppercase">ICU Beds</span>
              <div className="font-black text-sm text-[#3E2723] mt-0.5">3 Open</div>
              <span className="text-[9px] text-emerald-700 font-bold">Ventilators OK</span>
            </div>

            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] text-[#8D6E63] font-bold uppercase">Blood Bank</span>
              <div className="font-black text-sm text-[#3E2723] mt-0.5">B+ Ready</div>
              <span className="text-[9px] text-emerald-700 font-bold">4 Units Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
