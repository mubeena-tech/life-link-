import React from 'react';
import {
  AlertTriangle,
  Heart,
  Activity,
  MapPin,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  FileText,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import StatusBadge from '../components/common/StatusBadge';

export default function EmergencyInfo() {
  const { navigate, patient, ambulance } = useApp();

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Emergency Intake & Triage" showBack={true} />

      <div className="p-4 sm:p-5 space-y-4">
        {/* Priority Banner */}
        <div className="rounded-2xl bg-[#FFF5F5] border-2 border-[#FBD2CF] p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E53935] animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-[#C62828]">
                TRIAGE LEVEL 1: RED ALERT
              </span>
            </div>
            <StatusBadge status="CRITICAL" />
          </div>

          <h2 className="text-lg font-black text-[#8E1313] mt-2">
            {patient.incidentDetails.reason}
          </h2>
          <p className="text-xs text-[#7A1F1D] font-medium mt-1">
            {patient.incidentDetails.initialAssessment}
          </p>
        </div>

        {/* Real-time Telemetry Vitals */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5C4035] mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#C62828]" />
            Live Vitals Telemetry
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Heart Rate */}
            <div className="p-2.5 rounded-2xl bg-[#FFF5F5] border border-[#FBD2CF] text-center">
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase">Pulse / HR</span>
              <div className="text-lg font-black text-[#C62828] mt-0.5">
                {patient.vitals.heartRate.value}
                <span className="text-[10px] font-medium text-[#7A1F1D] ml-0.5">bpm</span>
              </div>
              <span className="inline-block px-1.5 py-0.2 rounded bg-red-100 text-[#C62828] text-[9px] font-bold">
                HIGH
              </span>
            </div>

            {/* SpO2 */}
            <div className="p-2.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-center">
              <span className="text-[10px] font-bold text-[#475569] uppercase">SpO2</span>
              <div className="text-lg font-black text-[#0284C7] mt-0.5">
                {patient.vitals.spo2.value}
                <span className="text-[10px] font-medium text-[#0369A1] ml-0.5">%</span>
              </div>
              <span className="inline-block px-1.5 py-0.2 rounded bg-blue-100 text-[#0284C7] text-[9px] font-bold">
                LOW (O2 REQ)
              </span>
            </div>

            {/* Blood Pressure */}
            <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] text-center">
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase">Blood Press.</span>
              <div className="text-base font-black text-[#3E2723] mt-1">
                {patient.vitals.bloodPressure.value}
              </div>
              <span className="inline-block px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                ELEVATED
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Ambulance & Hospital Dispatch Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Ambulance Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EBDED5] shadow-card flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">
                Dispatched Unit
              </span>
              <div className="text-base font-black text-[#3E2723] mt-0.5">
                Ambulance {ambulance.id}
              </div>
              <span className="text-xs font-semibold text-[#C62828] block mt-0.5">
                ETA: {ambulance.eta}
              </span>
            </div>
            <button
              onClick={() => navigate('live-track')}
              className="mt-3 py-1.5 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-[11px] font-bold text-[#5C4035] flex items-center justify-between hover:bg-[#F5EEE6]"
            >
              <span>Live Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hospital Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EBDED5] shadow-card flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">
                Receiving Facility
              </span>
              <div className="text-sm font-black text-[#3E2723] mt-0.5 line-clamp-1">
                {patient.incidentDetails.assignedHospital}
              </div>
              <span className="text-xs font-semibold text-emerald-700 block mt-0.5">
                Trauma Bay 1 Reserved
              </span>
            </div>
            <button
              onClick={() => navigate('hospital-search')}
              className="mt-3 py-1.5 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-[11px] font-bold text-[#5C4035] flex items-center justify-between hover:bg-[#F5EEE6]"
            >
              <span>Hospital Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Patient Profile Quick Summary */}
        <div className="p-4 rounded-2xl bg-white border border-[#EBDED5] shadow-card space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-2">
            <span className="font-extrabold text-[#3E2723]">
              {patient.name} ({patient.id})
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F5EEE6] text-[#5C4035] font-black">
              Blood Group: {patient.bloodGroup}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-[#F5EFEB]">
            <span className="text-[#8D6E63]">Emergency Location:</span>
            <span className="font-bold text-[#3E2723]">{patient.incidentDetails.location}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-[#F5EFEB]">
            <span className="text-[#8D6E63]">Known Allergies:</span>
            <span className="font-bold text-[#3E2723]">{patient.allergies}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-[#8D6E63]">Previous Surgery:</span>
            <span className="font-bold text-[#3E2723]">
              {patient.previousTreatment.procedure} ({patient.previousTreatment.date})
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('live-track')}
            className="flex-1 py-3 px-3 rounded-2xl bg-[#C62828] text-white font-extrabold text-xs shadow-emergency hover:bg-[#B71C1C] transition text-center"
          >
            Track Ambulance A01
          </button>
          <button
            onClick={() => navigate('digital-handover')}
            className="flex-1 py-3 px-3 rounded-2xl bg-[#5C4035] text-white font-extrabold text-xs shadow-card hover:bg-[#4A2E2B] transition text-center"
          >
            View ER Handover
          </button>
        </div>
      </div>
    </div>
  );
}
