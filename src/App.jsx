import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import DeviceFrame from './components/common/DeviceFrame';
import BottomNav from './components/common/BottomNav';

// Pages
import Home from './pages/Home';
import EmergencyCall from './pages/EmergencyCall';
import EmergencyInfo from './pages/EmergencyInfo';
import AIAssistant from './pages/AIAssistant';
import LiveTrack from './pages/LiveTrack';
import HospitalSearch from './pages/HospitalSearch';
import HospitalAvailability from './pages/HospitalAvailability';
import PatientDetails from './pages/PatientDetails';
import MedicalHistory from './pages/MedicalHistory';
import Notifications from './pages/Notifications';
import HospitalDashboard from './pages/HospitalDashboard';
import Settings from './pages/Settings';
import DigitalHandover from './pages/DigitalHandover';

function MainRouter() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home />;
      case 'emergency-call':
        return <EmergencyCall />;
      case 'emergency-info':
        return <EmergencyInfo />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'live-track':
        return <LiveTrack />;
      case 'hospital-search':
        return <HospitalSearch />;
      case 'hospital-availability':
        return <HospitalAvailability />;
      case 'patient-details':
        return <PatientDetails />;
      case 'medical-history':
        return <MedicalHistory />;
      case 'notifications':
        return <Notifications />;
      case 'hospital-dashboard':
        return <HospitalDashboard />;
      case 'settings':
        return <Settings />;
      case 'digital-handover':
        return <DigitalHandover />;
      default:
        return <Home />;
    }
  };

  // Hide bottom nav during active phone call screen to avoid distraction
  const hideBottomNav = currentScreen === 'emergency-call';

  return (
    <DeviceFrame>
      <div className="relative min-h-full">
        {renderScreen()}
        {!hideBottomNav && <BottomNav />}
      </div>
    </DeviceFrame>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
