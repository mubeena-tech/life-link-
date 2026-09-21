// Mock data matching all LIFELINK prototype specifications exactly

export const mockPatient = {
  id: "LL-10452",
  name: "Ravi Kumar",
  status: "Critical",
  bloodGroup: "B+",
  age: 38,
  gender: "Male",
  contact: "+91 98765 43210",
  emergencyContact: "Anita Kumar (Spouse) - +91 98401 23456",
  address: "House 42, Main Cross, ABC Village",
  allergies: "None recorded",
  medications: "Example medication (Cardio-protective statin 20mg, daily)",
  medicalHistory: "Previous treatment information & regular wellness follow-up",
  previousTreatment: {
    procedure: "Kidney-related surgical procedure",
    hospital: "Government Hospital B",
    date: "04 February 2026",
    status: "Completed",
    notes: "Minimally invasive laparoscopic procedure. Full post-operative recovery recorded."
  },
  vitals: {
    heartRate: { value: 114, unit: "bpm", status: "High", alert: true },
    spo2: { value: 92, unit: "%", status: "Low", alert: true },
    temperature: { value: 37.6, unit: "°C", status: "Normal", alert: false },
    bloodPressure: { value: "145/95", unit: "mmHg", status: "High", alert: true },
    respiratoryRate: { value: 24, unit: "rpm", status: "Elevated", alert: true },
    glucose: { value: 130, unit: "mg/dL", status: "Normal", alert: false }
  },
  incidentDetails: {
    date: "21 September 2026",
    time: "09:32 AM",
    location: "ABC Village",
    landmark: "Near Panchayat Office & Main Road Cross",
    reason: "Chest pain + breathing difficulty",
    priority: "Critical",
    initialAssessment: "Acute chest tightness radiating to left arm with dyspnea. Conscious, pale, sweating.",
    assignedHospital: "Government Hospital B"
  },
  transferStatus: {
    hospital: "Government Hospital B",
    eta: "9 minutes",
    distance: "4.2 km",
    destinationDept: "Emergency Trauma Bay 1",
    assignedDoctor: "Dr. Priya Nair (Emergency Physician)"
  }
};

export const mockMedicalHistory = [
  {
    id: "H-001",
    procedure: "Kidney-related surgical procedure",
    category: "Nephrology / Urology",
    hospital: "Government Hospital B",
    date: "04 February 2026",
    doctor: "Dr. Arvind Mehta",
    notes: "Minimally invasive laparoscopic surgical procedure. Routine recovery with no complications.",
    status: "Completed",
    documents: ["Kidney_Surgical_Summary.pdf", "Discharge_Report_Feb2026.pdf"]
  },
  {
    id: "H-002",
    procedure: "Emergency Cardiac Evaluation",
    category: "Cardiology",
    hospital: "Government Hospital B",
    date: "21 September 2026",
    doctor: "Dr. K. Swamy (On Call)",
    notes: "Acute presentation of chest pain & dyspnea. Immediate ALS ambulance triage and ICU reservation.",
    status: "Handover Completed",
    documents: ["Emergency_Handover_Sheet.pdf", "Vitals_Telemetry_Log.pdf"]
  },
  {
    id: "H-003",
    procedure: "Annual Preventive Health Screening",
    category: "General Medicine",
    hospital: "Government Hospital A",
    date: "12 October 2025",
    doctor: "Dr. Sunita Rao",
    notes: "Blood panel, lipid profile, and resting ECG performed. Advised mild dietary sodium restriction.",
    status: "Completed",
    documents: ["Annual_Health_Panel_2025.pdf"]
  }
];

export const mockAmbulance = {
  id: "A01",
  code: "A01",
  type: "Advanced Life Support (ALS) Emergency Ambulance",
  vehicleNumber: "DL 01 EM 4021",
  driverName: "Rajesh Kumar",
  driverPhone: "+91 98765 43210",
  paramedicName: "S. Anitha (Emergency Medical Tech)",
  currentLocation: "En Route near Sector 12 Arterial Road",
  patientLocation: "ABC Village",
  hospitalDestination: "Government Hospital B",
  status: "En Route",
  eta: "9 minutes",
  etaMinutes: 9,
  distance: "4.2 km",
  speed: "45 km/h",
  oxygenEquipped: true,
  ventilatorEquipped: true,
  ecgEquipped: true,
  defibrillatorEquipped: true,
  steps: [
    { label: "Emergency Request Received", time: "09:32 AM", completed: true, active: false },
    { label: "Ambulance A01 Dispatched", time: "09:34 AM", completed: true, active: false },
    { label: "En Route to Patient", time: "09:36 AM", completed: true, active: true },
    { label: "Arrival at ABC Village", time: "09:43 AM", completed: false, active: false },
    { label: "Transit to Government Hospital B", time: "09:50 AM", completed: false, active: false }
  ],
  coordinates: {
    patient: [13.0760, 80.2610], // ABC Village
    ambulance: [13.0827, 80.2707], // Ambulance A01
    hospital: [13.0900, 80.2850]  // Government Hospital B
  }
};

export const mockHospitals = [
  {
    id: "HOSP-01",
    name: "Government Hospital A",
    type: "Public District Hospital",
    distance: "3.2 km",
    driveTime: "8 min",
    rating: "4.3",
    address: "Civil Hospital Road, Sector 8",
    phone: "+91 11 2345 6701",
    facilities: {
      emergencyBed: { status: "AVAILABLE", count: 8 },
      icu: { status: "FULL", count: 0 },
      oxygen: { status: "AVAILABLE", count: 24 },
      ventilator: { status: "LIMITED", count: 1 },
      ecg: { status: "AVAILABLE", count: 4 },
      cardiology: { status: "NOT AVAILABLE", count: 0 },
      specialist: { status: "AVAILABLE", name: "General Surgeon on duty" },
      bloodBank: { status: "AVAILABLE", groups: ["O+", "A+", "B+"] }
    },
    coordinates: [13.0850, 80.2550]
  },
  {
    id: "HOSP-02",
    name: "Government Hospital B",
    type: "Public Tertiary Care & Trauma Center",
    distance: "4.2 km",
    driveTime: "9 min",
    rating: "4.7",
    address: "Ring Road Junction, Sector 12",
    phone: "+91 11 2345 6702",
    isRecommended: true,
    facilities: {
      emergencyBed: { status: "AVAILABLE", count: 14 },
      icu: { status: "AVAILABLE", count: 3 },
      oxygen: { status: "AVAILABLE", count: 42 },
      ventilator: { status: "AVAILABLE", count: 2 },
      ecg: { status: "AVAILABLE", count: 6 },
      cardiology: { status: "AVAILABLE", name: "Dr. K. Swamy (On Call)" },
      specialist: { status: "AVAILABLE", name: "Trauma & Emergency Specialist" },
      bloodBank: { status: "AVAILABLE", groups: ["Universal O-", "B+", "A+"] }
    },
    coordinates: [13.0900, 80.2850]
  },
  {
    id: "HOSP-03",
    name: "Apex Super Specialty Hospital",
    type: "Multi-Specialty Emergency Center",
    distance: "5.8 km",
    driveTime: "13 min",
    rating: "4.8",
    address: "Healthcare Corridor, Expressway Ext.",
    phone: "+91 11 2345 6703",
    facilities: {
      emergencyBed: { status: "AVAILABLE", count: 12 },
      icu: { status: "AVAILABLE", count: 5 },
      oxygen: { status: "AVAILABLE", count: 50 },
      ventilator: { status: "AVAILABLE", count: 4 },
      ecg: { status: "AVAILABLE", count: 8 },
      cardiology: { status: "AVAILABLE", name: "Cath Lab Active 24/7" },
      specialist: { status: "AVAILABLE", name: "Interventional Cardiologist" },
      bloodBank: { status: "AVAILABLE", groups: ["All Blood Types Available"] }
    },
    coordinates: [13.0650, 80.2800]
  },
  {
    id: "HOSP-04",
    name: "Community Emergency Clinic",
    type: "Urgent Care & Stabilization Unit",
    distance: "2.1 km",
    driveTime: "5 min",
    rating: "4.1",
    address: "Cross Street 4, West Colony",
    phone: "+91 11 2345 6704",
    facilities: {
      emergencyBed: { status: "FULL", count: 0 },
      icu: { status: "LIMITED", count: 1 },
      oxygen: { status: "AVAILABLE", count: 8 },
      ventilator: { status: "NOT AVAILABLE", count: 0 },
      ecg: { status: "AVAILABLE", count: 2 },
      cardiology: { status: "NOT AVAILABLE", count: 0 },
      specialist: { status: "LIMITED", name: "Medical Officer on duty" },
      bloodBank: { status: "LIMITED", groups: ["O+ only"] }
    },
    coordinates: [13.0720, 80.2510]
  }
];

export const mockNotifications = [
  {
    id: "N-101",
    title: "Ambulance A01 Dispatched",
    message: "Ambulance A01 has been dispatched to ABC Village.",
    time: "09:34 AM",
    date: "Today",
    type: "ambulance",
    unread: true
  },
  {
    id: "N-102",
    title: "Hospital Alert Received",
    message: "Hospital B has received the emergency alert and reserved an Emergency Bed.",
    time: "09:35 AM",
    date: "Today",
    type: "hospital",
    unread: true
  },
  {
    id: "N-103",
    title: "Ambulance ETA Updated",
    message: "Ambulance ETA updated to 9 minutes. Distance: 4.2 km.",
    time: "09:37 AM",
    date: "Today",
    type: "tracking",
    unread: false
  },
  {
    id: "N-104",
    title: "Patient Handover Prepared",
    message: "Patient handover completed and medical summary sent to Government Hospital B.",
    time: "09:40 AM",
    date: "Today",
    type: "handover",
    unread: false
  },
  {
    id: "N-105",
    title: "System Online & Telemetry Active",
    message: "LifeLink ID LL-10452 registered and connected to emergency dispatch mesh.",
    time: "09:30 AM",
    date: "Today",
    type: "system",
    unread: false
  }
];

export const mockHistoryEvents = [
  {
    id: "HIST-2026-09",
    lifelinkId: "LL-10452",
    title: "LL-10452 Emergency Completed",
    hospital: "Government Hospital B",
    date: "21 September 2026",
    time: "09:32 AM - 10:15 AM",
    status: "Handover Completed",
    priority: "Critical",
    reason: "Chest pain + breathing difficulty",
    ambulance: "A01",
    handoverDoctor: "Dr. Priya Nair (Emergency Physician)",
    details: "Patient stabilized with oxygen therapy and telemetry monitoring. Immediate ECG conducted and admitted to Cardiac Care Bay."
  },
  {
    id: "HIST-2026-02",
    lifelinkId: "LL-10452",
    title: "Hospital Treatment Record",
    hospital: "Government Hospital B",
    date: "04 February 2026",
    time: "08:00 AM - 04:00 PM",
    status: "Completed",
    priority: "Elective / Planned",
    reason: "Kidney-related surgical procedure",
    ambulance: "N/A (Scheduled)",
    handoverDoctor: "Dr. Arvind Mehta",
    details: "Laparoscopic surgical intervention completed successfully. Follow-up notes recorded in digital health locker."
  }
];

export const mockAIReplies = {
  greetings: "Hello Ravi! I am your LIFELINK Emergency AI Assistant. I can help organize emergency information, summarize your medical history for paramedics, and provide basic first-aid instructions while emergency services are en route.\n\n⚠️ Safety Notice: I help organize and summarize information only. I do NOT diagnose diseases, prescribe medications, or replace doctors or emergency professionals.",
  chestPain: "For sudden chest pain and breathing difficulty:\n\n1. **Keep the patient seated** in a comfortable upright or semi-reclined 'W' position with knees slightly bent.\n2. **Loosen tight clothing** around the neck and chest.\n3. **Do not give solid food or liquids**.\n4. **Stay calm** — Ambulance A01 has been dispatched (ETA: 9 minutes to ABC Village).\n5. Keep your emergency contact informed.\n\n⚠️ If the patient becomes unresponsive or stops normal breathing, immediately notify emergency dispatch to initiate hands-only CPR.",
  accident: "For physical trauma / road accident:\n\n1. **Do not move the patient's neck or spine** unless there is immediate danger (fire/traffic).\n2. **Control active bleeding** by applying firm, direct pressure with a clean cloth.\n3. **Keep the patient warm** to help prevent shock.\n4. **Keep airway clear** and monitor breathing.\n\nAmbulance A01 is en route with trauma equipment.",
  firstAid: "General Emergency First-Aid Guidelines:\n\n• **Airway**: Ensure the throat is unobstructed.\n• **Breathing**: Check chest movement.\n• **Circulation**: Check pulse. If absent, begin hands-only CPR at 100-120 bpm.\n• **Stay on the line**: Paramedics have received your LifeLink ID LL-10452 and GPS coordinates in ABC Village."
};
