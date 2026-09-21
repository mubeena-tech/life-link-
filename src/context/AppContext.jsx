import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  mockPatient,
  mockMedicalHistory,
  mockAmbulance,
  mockHospitals,
  mockNotifications,
  mockHistoryEvents
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState(['home']);
  const [patient, setPatient] = useState(mockPatient);
  const [ambulance, setAmbulance] = useState(mockAmbulance);
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [historyEvents, setHistoryEvents] = useState(mockHistoryEvents);
  const [medicalHistory, setMedicalHistory] = useState(mockMedicalHistory);
  const [selectedHospital, setSelectedHospital] = useState(mockHospitals[1]); // Default to Hospital B
  
  // Emergency lifecycle state: 'idle' | 'calling' | 'dispatched' | 'en-route' | 'handover'
  const [emergencyStatus, setEmergencyStatus] = useState('idle');
  
  // Device display mode for responsive prototype frame ('mobile' | 'tablet' | 'fluid')
  const [viewMode, setViewMode] = useState('mobile');

  // Navigation functions
  const navigate = (screenId, data = null) => {
    if (data && data.hospital) {
      setSelectedHospital(data.hospital);
    }
    setScreenHistory(prev => [...prev, screenId]);
    setCurrentScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHist = [...screenHistory];
      newHist.pop();
      const prevScreen = newHist[newHist.length - 1];
      setScreenHistory(newHist);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Simulated emergency workflow
  const triggerEmergency = () => {
    setEmergencyStatus('calling');
    navigate('emergency-call');
  };

  const dispatchAmbulance = () => {
    setEmergencyStatus('en-route');
    // Add real-time notification
    const newNotif = {
      id: `N-${Date.now()}`,
      title: "Ambulance A01 Dispatched",
      message: "Ambulance A01 dispatched to ABC Village. Priority: Critical. Hospital alert sent to Government Hospital B.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Just now",
      type: "ambulance",
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const resetEmergency = () => {
    setEmergencyStatus('idle');
    navigate('home');
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Live countdown for ETA simulation when active
  useEffect(() => {
    if (emergencyStatus === 'en-route') {
      const interval = setInterval(() => {
        setAmbulance(prev => {
          if (prev.etaMinutes > 1) {
            const nextMin = prev.etaMinutes - 1;
            return {
              ...prev,
              etaMinutes: nextMin,
              eta: `${nextMin} minutes`,
              distance: `${(nextMin * 0.45).toFixed(1)} km`
            };
          }
          return prev;
        });
      }, 45000); // countdown every 45s for demo realism
      return () => clearInterval(interval);
    }
  }, [emergencyStatus]);

  const value = {
    currentScreen,
    navigate,
    goBack,
    patient,
    setPatient,
    ambulance,
    setAmbulance,
    hospitals,
    setHospitals,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    historyEvents,
    medicalHistory,
    selectedHospital,
    setSelectedHospital,
    emergencyStatus,
    setEmergencyStatus,
    triggerEmergency,
    dispatchAmbulance,
    resetEmergency,
    viewMode,
    setViewMode
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
