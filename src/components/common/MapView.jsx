import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';

// Custom Map pin icons using DivIcon for crisp vector rendering without asset url issues
const createPatientIcon = () => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(198, 40, 40, 0.25); animation: ping 2s infinite;"></div>
        <div style="width: 26px; height: 26px; border-radius: 50%; background: #C62828; border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">
          P
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

const createAmbulanceIcon = () => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background: rgba(229, 57, 53, 0.35); animation: ping 1.4s infinite;"></div>
        <div style="width: 32px; height: 32px; border-radius: 10px; background: #FFFFFF; border: 2.5px solid #C62828; box-shadow: 0 3px 8px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; font-size: 16px;">
          🚑
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const createHospitalIcon = () => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="width: 30px; height: 30px; border-radius: 50%; background: #0284C7; border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
        🏥
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

export default function MapView({ className = "h-72 w-full" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { ambulance } = useApp();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up prior instance if hot reloading
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const patientCoords = ambulance.coordinates.patient;
    const ambCoords = ambulance.coordinates.ambulance;
    const hospitalCoords = ambulance.coordinates.hospital;

    // Center map roughly between ambulance and patient
    const centerLat = (patientCoords[0] + ambCoords[0] + hospitalCoords[0]) / 3;
    const centerLng = (patientCoords[1] + ambCoords[1] + hospitalCoords[1]) / 3;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // Standard clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Add Zoom Control on top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Patient Marker
      L.marker(patientCoords, { icon: createPatientIcon() })
        .addTo(map)
        .bindPopup(`<b>Patient: Ravi Kumar</b><br/>Location: ABC Village<br/>Priority: Critical`);

      // Ambulance A01 Marker
      L.marker(ambCoords, { icon: createAmbulanceIcon() })
        .addTo(map)
        .bindPopup(`<b>Ambulance A01</b><br/>Status: En Route<br/>ETA: ${ambulance.eta}<br/>Distance: ${ambulance.distance}`)
        .openPopup();

      // Hospital Marker
      L.marker(hospitalCoords, { icon: createHospitalIcon() })
        .addTo(map)
        .bindPopup(`<b>Government Hospital B</b><br/>Emergency Bed Reserved`);

      // Draw route connecting Patient -> Ambulance -> Hospital
      const routePoints = [patientCoords, ambCoords, hospitalCoords];
      
      // Outer glow line
      L.polyline(routePoints, {
        color: '#C62828',
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(map);

      // Fit bounds with comfortable padding
      const bounds = L.latLngBounds(routePoints);
      map.fitBounds(bounds, { padding: [35, 35] });

      mapInstanceRef.current = map;
    } catch (err) {
      console.error("Leaflet map initialization error:", err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [ambulance]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#EBDED5] shadow-inner bg-[#F5EEE6] ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Live GPS Telemetry Badge overlay */}
      <div className="absolute top-2.5 left-2.5 z-[400] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#EBDED5] text-[10px] font-bold text-[#3E2723] flex items-center gap-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>SIMULATED GPS: SATELLITE LOCK</span>
      </div>
    </div>
  );
}
