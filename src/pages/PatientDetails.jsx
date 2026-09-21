import React, { useState } from 'react';
import {
  User,
  IdCard,
  Droplet,
  AlertCircle,
  Pill,
  FileText,
  Calendar,
  Building2,
  Phone,
  QrCode,
  CheckCircle2,
  Edit3,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';

export default function PatientDetails() {
  const { patient, navigate } = useApp();
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Patient Profile" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Main Patient Header Card */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#5C4035] text-white flex items-center justify-center font-black text-xl shadow-2xs">
                RK
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#2D1E18]">
                  {patient.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#795548] font-bold mt-0.5">
                  <IdCard className="w-3.5 h-3.5 text-[#5C4035]" />
                  <span>LifeLink ID: {patient.id}</span>
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {patient.gender}, {patient.age} yrs • ABC Village
                </span>
              </div>
            </div>

            {/* Blood Group Badge */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#FFF5F5] border border-[#FBD2CF] text-[#C62828] min-w-[55px]">
              <Droplet className="w-4 h-4 fill-[#C62828]" />
              <span className="text-base font-black leading-none mt-0.5">{patient.bloodGroup}</span>
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#A84842]">Blood</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5EFEB] flex items-center justify-between gap-2">
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex-1 py-2 px-3 rounded-xl bg-[#FAF7F2] border border-[#EBDED5] text-xs font-bold text-[#5C4035] flex items-center justify-center gap-1.5 hover:bg-[#F5EEE6]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQR ? "Hide QR" : "Show LifeLink QR"}</span>
            </button>

            <button
              onClick={() => navigate('digital-handover')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#5C4035] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#4A2E2B]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>ER Handover Sheet</span>
            </button>
          </div>

          {/* QR Code Reveal */}
          {showQR && (
            <div className="mt-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] text-center space-y-2">
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-[#CBD5E1] shadow-inner flex items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="white" />
                  <path d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z" fill="#3E2723" />
                  <path d="M18 18h14v14h-14z M68 18h14v14h-14z M18 68h14v14h-14z" fill="white" />
                  <path d="M45 15h10v10h-10z M45 35h10v20h-10z M65 45h20v10h-20z M45 65h20v10h-20z M70 70h15v15h-15z" fill="#3E2723" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#5C4035] block">
                Scan for instant ER intake authentication ({patient.id})
              </span>
            </div>
          )}
        </div>

        {/* CARD 1: Allergies */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#FFF5F5] text-[#C62828] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#5C4035]">
              Allergies
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
            <span className="text-xs font-bold text-[#3E2723]">{patient.allergies}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Safe
            </span>
          </div>
        </div>

        {/* CARD 2: Medications */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#EFF6FF] text-[#0284C7] flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#5C4035]">
              Medications
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
            <span className="text-xs font-bold text-[#3E2723] block">{patient.medications}</span>
            <span className="text-[11px] text-[#795548] mt-0.5 block">
              Administered daily with morning meals.
            </span>
          </div>
        </div>

        {/* CARD 3: Medical History & Previous Hospital Treatment (Exact Spec in Prompt #9) */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#5C4035]">
              Medical History
            </h3>
          </div>

          <p className="text-xs text-[#795548] font-medium leading-relaxed">
            {patient.medicalHistory}
          </p>

          {/* Previous Hospital Treatment Card */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8D6E63] block">
              Previous Hospital Treatment:
            </span>

            <div className="font-black text-sm text-[#2D1E18]">
              {patient.previousTreatment.procedure}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#795548] pt-1">
              <span className="flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#5C4035]" />
                {patient.previousTreatment.date}
              </span>

              <span className="flex items-center gap-1 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-[#5C4035]" />
                {patient.previousTreatment.hospital}
              </span>
            </div>

            <p className="text-[11px] text-neutral-600 italic pt-1">
              {patient.previousTreatment.notes}
            </p>
          </div>
        </div>

        {/* CARD 4: Emergency Contacts */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#5C4035]">
              Primary Emergency Contact
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#3E2723] block">
                {patient.emergencyContact}
              </span>
              <span className="text-[10px] text-[#795548]">Notified via SMS & LifeLink Mesh</span>
            </div>
            <a
              href="tel:+919840123456"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
