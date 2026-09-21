import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Activity,
  MapPin,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/common/Header';

export default function EmergencyCall() {
  const { navigate, patient, ambulance, dispatchAmbulance, resetEmergency } = useApp();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [selectedEmergency, setSelectedEmergency] = useState('Chest pain + breathing difficulty');
  const [callPhase, setCallPhase] = useState('connecting'); // 'connecting' | 'connected' | 'dispatched'

  useEffect(() => {
    // Simulate call connecting in 1.8s
    const connectTimer = setTimeout(() => {
      setCallPhase('connected');
    }, 1800);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval;
    if (callPhase === 'connected' || callPhase === 'dispatched') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callPhase]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleDispatch = () => {
    setCallPhase('dispatched');
    dispatchAmbulance();
    setTimeout(() => {
      navigate('live-track');
    }, 1600);
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#2A1816] via-[#3E2723] to-[#1E1210] text-white">
      {/* Header */}
      <Header title="Emergency Dispatch" showBack={true} />

      <div className="p-4 sm:p-6 flex flex-col items-center justify-between flex-1 space-y-6">
        {/* Prototype Safety Notice */}
        <div className="w-full py-1.5 px-3 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 text-[11px] font-bold text-center flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>SIMULATED PROTOTYPE: Not connected to 108/112 emergency services.</span>
        </div>

        {/* Dispatcher Center Avatar & Pulsing Wave */}
        <div className="flex flex-col items-center justify-center my-auto text-center">
          <div className="relative mb-5">
            {/* Pulsing radar rings */}
            <div className="absolute -inset-6 rounded-full bg-red-600/20 animate-ping" />
            <div className="absolute -inset-3 rounded-full bg-red-500/30 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#C62828] to-[#8E1313] border-4 border-white/90 shadow-2xl flex items-center justify-center text-3xl">
              🚨
            </div>
          </div>

          <h2 className="text-xl font-black tracking-tight text-[#FAF7F2]">
            LIFELINK Emergency Dispatcher
          </h2>

          <span className="text-sm font-semibold text-neutral-300 mt-1 flex items-center gap-1.5">
            {callPhase === 'connecting' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Connecting to 108 Emergency Control...
              </>
            )}
            {callPhase === 'connected' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Connected • {formatTime(callDuration)}
              </>
            )}
            {callPhase === 'dispatched' && (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Ambulance A01 Dispatched! Redirecting...
              </>
            )}
          </span>
        </div>

        {/* Live Triage Summary Card */}
        <div className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3.5 text-xs text-neutral-200 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Patient Telemetry
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-extrabold text-[10px] border border-red-500/30">
              PRIORITY: CRITICAL
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <div>
              <span className="text-[10px] text-neutral-400 block">Patient</span>
              <span className="font-bold text-white text-xs">{patient.name} ({patient.id})</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Location</span>
              <span className="font-bold text-white text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                {patient.incidentDetails.location}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block mb-1">Select Emergency Nature:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                'Chest pain + breathing difficulty',
                'Road Traffic Accident',
                'Severe Trauma / Bleeding',
                'Unresponsive / Stroke'
              ].map((em) => (
                <button
                  key={em}
                  onClick={() => setSelectedEmergency(em)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold text-left transition border ${
                    selectedEmergency === em
                      ? 'bg-[#C62828] text-white border-red-400 shadow-sm'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dispatch Action & Call Control Buttons */}
        <div className="w-full space-y-3">
          {/* Prominent Dispatch Button */}
          <button
            onClick={handleDispatch}
            disabled={callPhase === 'dispatched'}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg active:scale-98 transition disabled:opacity-75"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>CONFIRM & DISPATCH AMBULANCE A01</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Controls: Mute, Speaker, End Call */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition border ${
                isMuted
                  ? 'bg-amber-500 text-neutral-900 border-amber-300'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Mute microphone"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* End Call Button */}
            <button
              onClick={resetEmergency}
              className="w-16 h-16 rounded-full bg-[#C62828] hover:bg-[#B71C1C] text-white flex items-center justify-center shadow-xl active:scale-95 transition"
              title="Cancel emergency call"
            >
              <PhoneOff className="w-7 h-7" />
            </button>

            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition border ${
                isSpeaker
                  ? 'bg-white text-[#3E2723] border-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Toggle speaker"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
