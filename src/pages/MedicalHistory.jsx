import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  ChevronRight,
  Stethoscope,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import StatusBadge from '../components/common/StatusBadge';

export default function MedicalHistory() {
  const { historyEvents, medicalHistory, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('emergency'); // 'emergency' | 'all'

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Treatment History" showBack={true} />

      <div className="p-3.5 sm:p-5 space-y-4">
        {/* Top Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF7F2] border border-[#EBDED5]">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition ${
              activeTab === 'emergency'
                ? 'bg-[#5C4035] text-white shadow-2xs'
                : 'text-[#795548] hover:text-[#3E2723]'
            }`}
          >
            Emergency Events
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition ${
              activeTab === 'all'
                ? 'bg-[#5C4035] text-white shadow-2xs'
                : 'text-[#795548] hover:text-[#3E2723]'
            }`}
          >
            All Past Treatments
          </button>
        </div>

        {/* Timeline / Card Design */}
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[#EBDED5] before:z-0">
          {activeTab === 'emergency' ? (
            historyEvents.map((event) => (
              <div key={event.id} className="relative pl-8 z-10">
                {/* Timeline node */}
                <div className="absolute left-2.5 top-5 w-3.5 h-3.5 rounded-full bg-[#C62828] border-2 border-white shadow-sm -translate-x-1/2" />

                <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card hover:shadow-elevated transition">
                  {/* Event Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-[#F5EFEB] pb-2.5 mb-2.5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C62828]">
                        {event.lifelinkId}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#2D1E18]">
                        {event.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">
                      {event.status}
                    </span>
                  </div>

                  {/* Required Details in Prompt #11:
                      Hospital: Government Hospital B
                      Date: 21 September 2026
                      Status: Handover Completed */}
                  <div className="space-y-1.5 text-xs text-[#5C4035]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8D6E63] font-semibold">Hospital:</span>
                      <span className="font-extrabold text-[#3E2723] flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#5C4035]" />
                        {event.hospital}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8D6E63] font-semibold">Date:</span>
                      <span className="font-extrabold text-[#3E2723] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#5C4035]" />
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8D6E63] font-semibold">Attending Doctor:</span>
                      <span className="font-bold text-[#3E2723]">{event.handoverDoctor}</span>
                    </div>

                    <p className="text-[11px] text-neutral-600 italic pt-1 border-t border-[#F5EFEB]">
                      {event.details}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F5EFEB] flex justify-end">
                    <button
                      onClick={() => navigate('digital-handover')}
                      className="text-xs font-extrabold text-[#5C4035] hover:text-[#C62828] flex items-center gap-1"
                    >
                      <span>View Handover Sheet</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            medicalHistory.map((item) => (
              <div key={item.id} className="relative pl-8 z-10">
                <div className="absolute left-2.5 top-5 w-3.5 h-3.5 rounded-full bg-[#5C4035] border-2 border-white shadow-sm -translate-x-1/2" />

                <div className="rounded-3xl bg-white border border-[#EBDED5] p-4 shadow-card">
                  <div className="flex items-start justify-between gap-2 border-b border-[#F5EFEB] pb-2.5 mb-2.5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#8D6E63]">
                        {item.category}
                      </span>
                      <h3 className="font-extrabold text-sm text-[#2D1E18]">
                        {item.procedure}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#5C4035] border border-[#EBDED5] text-[10px] font-bold">
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#5C4035]">
                    <div className="flex justify-between">
                      <span className="text-[#8D6E63]">Hospital:</span>
                      <span className="font-bold text-[#3E2723]">{item.hospital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8D6E63]">Date:</span>
                      <span className="font-bold text-[#3E2723]">{item.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8D6E63]">Doctor:</span>
                      <span className="font-bold text-[#3E2723]">{item.doctor}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 italic pt-1">
                      {item.notes}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
