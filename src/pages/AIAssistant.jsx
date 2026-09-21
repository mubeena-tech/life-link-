import React, { useState } from 'react';
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  ClipboardCheck,
  HeartPulse,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';
import { mockAIReplies } from '../data/mockData';

export default function AIAssistant() {
  const { patient, ambulance } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: mockAIReplies.greetings,
      timestamp: '09:33 AM',
    },
    {
      sender: 'ai',
      text: `Patient profile detected for ${patient.name} (${patient.id}).\n• Blood Group: ${patient.bloodGroup}\n• Current Emergency: ${patient.incidentDetails.reason}\n• Location: ${patient.incidentDetails.location}\n\nI have organized these details so they can be securely handed over to Ambulance ${ambulance.id} and the emergency room.`,
      timestamp: '09:34 AM',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: "Chest Pain First-Aid", key: "chestPain" },
    { label: "Road Trauma Steps", key: "accident" },
    { label: "General First-Aid", key: "firstAid" },
    { label: "Organize Intake Summary", key: "organize" },
  ];

  const handleSend = (textToSend = null, key = null) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic response timer
    setTimeout(() => {
      let reply = "";
      if (key && mockAIReplies[key]) {
        reply = mockAIReplies[key];
      } else if (text.toLowerCase().includes('chest') || text.toLowerCase().includes('heart')) {
        reply = mockAIReplies.chestPain;
      } else if (text.toLowerCase().includes('accident') || text.toLowerCase().includes('trauma')) {
        reply = mockAIReplies.accident;
      } else if (text.toLowerCase().includes('organize') || text.toLowerCase().includes('summary') || text.toLowerCase().includes('report')) {
        reply = `📋 Organized Emergency Handover Report:\n\n• Patient: ${patient.name} (${patient.id})\n• Priority: Critical (Red Alert)\n• Complaint: ${patient.incidentDetails.reason}\n• Location: ${patient.incidentDetails.location}\n• Vitals: HR ${patient.vitals.heartRate.value} bpm, SpO2 ${patient.vitals.spo2.value}%\n• Past Procedure: ${patient.previousTreatment.procedure} (${patient.previousTreatment.date})\n• Dispatched Unit: Ambulance ${ambulance.id} (ETA 9 mins)\n\nThis summary is ready for doctor handover.`;
      } else {
        reply = `I have recorded: "${text}".\n\nI am organizing this into your emergency handover file for the paramedics and ER team at ${patient.incidentDetails.assignedHospital}.\n\n⚠️ Reminder: If there are life-threatening symptoms, remain with the patient and follow the dispatcher instructions on your active emergency line.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="LIFELINK Emergency AI" showBack={true} />

      {/* Safety Notice Banner */}
      <div className="bg-[#FFF5F5] border-b border-[#FBD2CF] p-3 text-xs text-[#8E1313]">
        <div className="flex items-start gap-2 max-w-lg mx-auto">
          <ShieldAlert className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-extrabold block">Emergency AI Safety Notice:</span>
            <span className="text-[11px] text-[#7A1F1D]">
              This AI assistant organizes emergency information and first-aid instructions only. It does <strong>NOT diagnose illnesses</strong>, prescribe medications, or replace doctors or paramedics.
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 p-3.5 sm:p-5 space-y-3.5 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-[#5C4035] text-white'
                  : 'bg-[#7C3AED] text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-3xl p-3.5 shadow-card text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#5C4035] text-white rounded-tr-none'
                  : 'bg-white text-[#3E2723] border border-[#EBDED5] rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <span
                className={`text-[9.5px] font-semibold block text-right mt-1.5 ${
                  msg.sender === 'user' ? 'text-[#D5C2B4]' : 'text-[#8D6E63]'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#795548] italic pl-10">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:0.4s]" />
            </div>
            <span>Organizing emergency information...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-3.5 py-2 border-t border-[#EBDED5] bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((q) => (
          <button
            key={q.key}
            onClick={() => handleSend(q.label, q.key)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EBDED5] text-[10.5px] font-bold text-[#5C4035] hover:bg-[#F5EEE6] active:scale-95 transition"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-[#EBDED5] bg-[#FAF7F2]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type symptoms or ask to organize info..."
            className="flex-1 py-2.5 px-4 rounded-2xl bg-white border border-[#EBDED5] text-xs text-[#3E2723] focus:outline-none focus:border-[#5C4035] shadow-inner placeholder-[#A88E7D]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-2xl bg-[#5C4035] text-white flex items-center justify-center shadow-card hover:bg-[#4A2E2B] active:scale-95 disabled:opacity-40 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
