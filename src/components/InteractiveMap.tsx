"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const evChargingLocations = [
  {
    name: "Dongguan",
    specialty: "Cable Extrusion & Material Suppliers",
    description: "Major hub for EV charging cable manufacturing and raw material suppliers.",
    lat: 23.0489,
    lng: 113.7447,
  },
  {
    name: "Shenzhen",
    specialty: "Connector Molding & Electronics",
    description: "Global electronics center. EV charging connector molding and PCB assembly.",
    lat: 22.5431,
    lng: 114.0579,
  },
  {
    name: "Huizhou",
    specialty: "PCB Assembly & Testing",
    description: "Specialized in circuit board assembly and product testing for EV charging equipment.",
    lat: 23.1115,
    lng: 114.4152,
  },
  {
    name: "Guangzhou",
    specialty: "Final Assembly & Logistics",
    description: "Final product assembly and logistics hub for international shipments.",
    lat: 23.1291,
    lng: 113.2644,
  },
];

const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="#f97316"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

export default function InteractiveMap() {
  const centerLat = 23.08;
  const centerLng = 113.8;

  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-lg">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={9}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* 100km radius circle */}
        <Circle
          center={[centerLat, centerLng]}
          radius={50000}
          pathOptions={{
            color: '#fb923c',
            fillColor: '#fb923c',
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '5, 5'
          }}
        />

        {evChargingLocations.map((loc) => (
          <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-base">{loc.name}</h3>
                <p className="text-orange-600 text-sm font-medium mt-1">{loc.specialty}</p>
                <p className="text-gray-600 text-xs mt-2 leading-relaxed">{loc.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
