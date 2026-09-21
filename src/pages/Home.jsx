import React from 'react';
import {
  Activity,
  MapPin,
  IdCard,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Building,
  HeartPulse,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import EmergencyCard from '../components/common/EmergencyCard';
import FeatureCard from '../components/common/FeatureCard';
import {
  NearestHospitalIcon,
  HelpWithAIIcon,
  LiveTrackIcon,
  HospitalAvailabilityIcon,
  PatientDetailsIcon
} from '../components/common/CustomIcons';

export default function Home() {
  const {
    navigate,
    patient,
    ambulance,
    emergencyStatus,
  } = useApp();

  return (
    <div className="flex flex-col min-h-full">
      {/* 1. Mobile Header with LIFELINK logo & profile icon */}
      <Header />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* 2. EMERGENCY HERO SECTION */}
        <EmergencyCard />

        {/* Section Heading: Core Emergency Features */}
        <div className="flex items-center justify-between pt-1 px-0.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#5C4035] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C62828]" />
            Core Emergency Services
          </h2>
          <span className="text-[11px] font-semibold text-[#8D6E63]">
            Instant Response
          </span>
        </div>

        {/* 3. MAIN HOME FEATURES (Responsive 2-column grid on mobile) */}
        <div className="grid grid-cols-2 gap-3">
          {/* CARD 1: NEAREST HOSPITAL */}
          <FeatureCard
            title="NEAREST HOSPITAL"
            text="Find the nearest hospital and emergency facilities."
            icon={<NearestHospitalIcon className="w-6 h-6 text-[#0284C7]" />}
            actionText="View Hospitals"
            colorScheme="blue"
            onClick={() => navigate('hospital-search')}
          />

          {/* CARD 2: HELP WITH AI */}
          <FeatureCard
            title="HELP WITH AI"
            text="Get help organizing emergency information."
            icon={<HelpWithAIIcon className="w-6 h-6 text-[#7C3AED]" />}
            actionText="Ask AI"
            colorScheme="purple"
            onClick={() => navigate('ai-assistant')}
          />

          {/* CARD 3: LIVE TRACK */}
          <FeatureCard
            title="LIVE TRACK"
            text="Track your ambulance and view estimated arrival time."
            icon={<LiveTrackIcon className="w-6 h-6 text-[#EA580C]" />}
            actionText="Track Ambulance"
            colorScheme="orange"
            badge={emergencyStatus === 'en-route' ? `${ambulance.eta}` : null}
            onClick={() => navigate('live-track')}
          />

          {/* CARD 5: CHECK PATIENT DETAILS */}
          <FeatureCard
            title="PATIENT DETAILS"
            text="View your medical information, allergies, medications and treatment history."
            icon={<PatientDetailsIcon className="w-6 h-6 text-[#5C4035]" />}
            actionText="View Patient Details"
            colorScheme="brown"
            onClick={() => navigate('patient-details')}
          />

          {/* CARD 4: HOSPITAL AVAILABILITY (Spans full width for clean display of facility indicators) */}
          <FeatureCard
            fullWidth={true}
            title="HOSPITAL AVAILABILITY"
            text="Check hospitals and available emergency facilities."
            icon={<HospitalAvailabilityIcon className="w-6 h-6 text-[#16A34A]" />}
            actionText="View Availability"
            colorScheme="green"
            facilityIndicators={[
              "Emergency Bed",
              "ICU",
              "Oxygen",
              "Ventilator",
              "ECG",
              "Specialist"
            ]}
            onClick={() => navigate('hospital-availability')}
          />
        </div>

        {/* 4. HOME PAGE STATUS SECTION (Specified in Prompt #5) */}
        <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-2.5 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5C4035] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              Telemetry Status
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-extrabold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {/* Emergency Status */}
            <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] text-[#8D6E63] font-bold block uppercase tracking-wider">
                Emergency Status
              </span>
              <span
                className={`font-black text-[12.5px] flex items-center gap-1.5 mt-1 ${
                  emergencyStatus === 'idle' ? 'text-[#5C4035]' : 'text-[#C62828]'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                {emergencyStatus === 'idle'
                  ? 'No active emergency'
                  : `Ambulance ${ambulance.id} En Route`}
              </span>
            </div>

            {/* LifeLink ID */}
            <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
              <span className="text-[10px] text-[#8D6E63] font-bold block uppercase tracking-wider">
                LifeLink ID
              </span>
              <span className="font-black text-[13px] text-[#3E2723] flex items-center gap-1 mt-1">
                <IdCard className="w-3.5 h-3.5 text-[#5C4035]" />
                {patient.id}
              </span>
            </div>

            {/* Location (Full width) */}
            <div className="col-span-2 p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#EBDED5] flex items-center justify-center flex-shrink-0 text-[#C62828]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#8D6E63] font-bold block uppercase tracking-wider">
                    Location
                  </span>
                  <span className="text-xs font-extrabold text-[#3E2723]">
                    {patient.incidentDetails.location} (Simulated GPS)
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('live-track')}
                className="text-xs font-extrabold text-[#5C4035] hover:text-[#C62828] flex items-center gap-0.5"
              >
                Track <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. QUICK WORKFLOW SHORTCUTS */}
        <div className="pt-1">
          <div className="text-[11px] font-bold text-[#8D6E63] uppercase tracking-wider mb-2 px-1">
            Clinical Handover & Staff Shortcuts
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => navigate('medical-history')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-[#EBDED5] text-[11px] font-extrabold text-[#5C4035] shadow-card hover:bg-[#F5EEE6] transition text-center flex flex-col items-center gap-1"
            >
              <Stethoscope className="w-4 h-4 text-[#795548]" />
              <span>Medical History</span>
            </button>
            <button
              onClick={() => navigate('hospital-dashboard')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-[#EBDED5] text-[11px] font-extrabold text-[#5C4035] shadow-card hover:bg-[#F5EEE6] transition text-center flex flex-col items-center gap-1"
            >
              <Building className="w-4 h-4 text-[#0284C7]" />
              <span>ER Staff Desk</span>
            </button>
            <button
              onClick={() => navigate('digital-handover')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-[#EBDED5] text-[11px] font-extrabold text-[#5C4035] shadow-card hover:bg-[#F5EEE6] transition text-center flex flex-col items-center gap-1"
            >
              <Share2 className="w-4 h-4 text-[#16A34A]" />
              <span>Patient Handover</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
