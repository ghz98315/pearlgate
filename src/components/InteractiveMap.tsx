"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    name: "Yangjiang",
    specialty: "Knives & Hand Tools",
    description: "World's largest knife export base — 60% of China's knife exports originate here.",
    lat: 21.8576,
    lng: 111.9822,
  },
  {
    name: "Foshan",
    specialty: "Aluminum & Building Hardware",
    description: "China's building materials capital. Aluminum extrusion, stainless steel fittings, architectural hardware.",
    lat: 23.0218,
    lng: 113.1218,
  },
  {
    name: "Guangzhou",
    specialty: "Garments & Trade Hub",
    description: "National garment wholesale center. B2B workwear, corporate uniforms, and fast fashion supply chain.",
    lat: 23.1291,
    lng: 113.2644,
  },
  {
    name: "Dongguan",
    specialty: "Precision Parts & OEM",
    description: "Global precision manufacturing hub. CNC machining, stamping, molds, and electronic components.",
    lat: 23.0489,
    lng: 113.7447,
  },
  {
    name: "Shenzhen",
    specialty: "Electronics & Tech",
    description: "World's electronics manufacturing center. PCB, consumer electronics, and rapid prototyping.",
    lat: 22.5431,
    lng: 114.0579,
  },
];

const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="#E8853D"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

export default function InteractiveMap() {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={[22.8, 113.2]}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc) => (
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
