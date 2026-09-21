import React, { useState } from 'react';
import {
  FileCheck2,
  Share2,
  CheckCircle2,
  Printer,
  ShieldCheck,
  User,
  HeartPulse,
  Building2,
  Calendar,
  Clock,
  QrCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';

export default function DigitalHandover() {
  const { patient, ambulance, navigate } = useApp();
  const [signedByDoctor, setSignedByDoctor] = useState(false);
  const [handoverComplete, setHandoverComplete] = useState(false);

  const handleCompleteHandover = () => {
    setSignedByDoctor(true);
    setHandoverComplete(true);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Digital Patient Handover" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Handover Header */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C62828] block">
                Official Clinical Transfer Form
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#2D1E18]">
                Paramedic-to-ER Handover
              </h2>
              <span className="text-xs text-[#795548]">
                LifeLink Token: <strong>LL-10452-EMG</strong>
              </span>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
              handoverComplete
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-orange-50 text-orange-700 border-orange-200'
            }`}>
              {handoverComplete ? 'Handover Completed' : 'Pending ER Sign-off'}
            </span>
          </div>
        </div>

        {/* Clinical Summary Document Card */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card space-y-3 text-xs">
          {/* Section 1: Patient Details */}
          <div className="border-b border-[#F5EFEB] pb-3">
            <span className="font-extrabold uppercase text-[10px] text-[#8D6E63] block mb-1.5">
              1. Patient Identification
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#8D6E63] block text-[10px]">Name:</span>
                <span className="font-black text-[#2D1E18]">{patient.name}</span>
              </div>
              <div>
                <span className="text-[#8D6E63] block text-[10px]">LifeLink ID:</span>
                <span className="font-black text-[#2D1E18]">{patient.id}</span>
              </div>
              <div>
                <span className="text-[#8D6E63] block text-[10px]">Blood Group:</span>
                <span className="font-black text-[#C62828]">{patient.bloodGroup}</span>
              </div>
              <div>
                <span className="text-[#8D6E63] block text-[10px]">Age / Gender:</span>
                <span className="font-bold text-[#2D1E18]">{patient.age}y / {patient.gender}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Emergency Incident & Assessment */}
          <div className="border-b border-[#F5EFEB] pb-3">
            <span className="font-extrabold uppercase text-[10px] text-[#8D6E63] block mb-1.5">
              2. Emergency Incident & Field Triage
            </span>
            <div className="space-y-1.5">
              <div>
                <span className="text-[#8D6E63] block text-[10px]">Chief Complaint:</span>
                <span className="font-extrabold text-[#C62828] text-xs">
                  {patient.incidentDetails.reason}
                </span>
              </div>
              <div>
                <span className="text-[#8D6E63] block text-[10px]">Field Assessment:</span>
                <p className="text-[11px] text-[#3E2723] italic">
                  {patient.incidentDetails.initialAssessment}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Vitals at Transfer */}
          <div className="border-b border-[#F5EFEB] pb-3">
            <span className="font-extrabold uppercase text-[10px] text-[#8D6E63] block mb-1.5">
              3. Vitals En Route (Ambulance {ambulance.id})
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-[#FFF5F5] border border-[#FBD2CF]">
                <span className="text-[9px] text-[#8D6E63] font-bold block">Heart Rate</span>
                <span className="font-black text-sm text-[#C62828]">{patient.vitals.heartRate.value} bpm</span>
              </div>
              <div className="p-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
                <span className="text-[9px] text-[#475569] font-bold block">SpO2 (on O2)</span>
                <span className="font-black text-sm text-[#0284C7]">{patient.vitals.spo2.value}%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EBDED5]">
                <span className="text-[9px] text-[#8D6E63] font-bold block">BP</span>
                <span className="font-black text-sm text-[#3E2723]">{patient.vitals.bloodPressure.value}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Relevant Past Medical History */}
          <div className="pb-1">
            <span className="font-extrabold uppercase text-[10px] text-[#8D6E63] block mb-1.5">
              4. Relevant Medical History
            </span>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="font-bold text-[#3E2723] block">
                {patient.previousTreatment.procedure}
              </span>
              <span className="text-[10px] text-[#795548]">
                Treated on {patient.previousTreatment.date} at {patient.previousTreatment.hospital}.
              </span>
            </div>
          </div>
        </div>

        {/* Paramedic & Doctor Sign-off */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#5C4035]">
              Verification Sign-off
            </span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cryptographically Verified
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#8D6E63]">Transferring Paramedic:</span>
              <span className="font-extrabold text-[#3E2723]">
                {ambulance.paramedicName} (Ambulance {ambulance.id})
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#8D6E63]">Receiving ER Physician:</span>
              <span className="font-extrabold text-[#3E2723]">
                {patient.transferStatus.assignedDoctor}
              </span>
            </div>
          </div>

          {!handoverComplete ? (
            <button
              onClick={handleCompleteHandover}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-card transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ER Doctor Sign-off & Confirm Handover</span>
            </button>
          ) : (
            <div className="mt-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Handover Complete! Patient admitted to Emergency Trauma Bay 1.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
