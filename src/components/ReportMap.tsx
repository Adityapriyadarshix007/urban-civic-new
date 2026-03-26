import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Report, ReportCategory } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Fix default marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  reports: Report[];
}

const createPulseIcon = () =>
  L.divIcon({
    className: '',
    html: `<div class="pulse-marker"></div>`,
    iconSize: [20, 20],
  });

// 🎯 Priority color
const getMarkerColor = (priority: string) => {
  if (priority === "HIGH") return "red";
  if (priority === "MEDIUM") return "orange";
  return "green";
};

const createIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [32, 32],
  });

export default function ReportMap({ reports }: Props) {
  const navigate = useNavigate();

  // 🔥 FILTER STATE
  const [selectedCategory, setSelectedCategory] = useState<
    ReportCategory | "ALL"
  >("ALL");

  // 🔥 FILTER LOGIC
  const filteredReports = reports
    .filter((r) => r.location.lat && r.location.lng)
    .filter((r) =>
      selectedCategory === "ALL" ? true : r.category === selectedCategory
    );

  // 🔥 CENTER LOGIC
  const center =
    filteredReports.length > 0
      ? [filteredReports[0].location.lat, filteredReports[0].location.lng]
      : [20.5937, 78.9629];

  function FitBounds({ reports }: { reports: Report[] }) {
    const map = useMap();

    useEffect(() => {
      if (reports.length === 0) return;

      const bounds = reports.map(r => [r.location.lat, r.location.lng]);

      if (bounds.length > 0) {
        map.fitBounds(bounds as any, { padding: [50, 50] });
      }
    }, [reports, map]);

    return null;
  }

  return (
    <div className="space-y-4">

      {/* 🔥 FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "Waste", "Pothole", "Leak", "Streetlight"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 LEGEND */}
      <div className="flex gap-4 items-center text-sm bg-white px-3 py-2 rounded-md shadow-sm">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span>High</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
          <span>Medium</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span>Low</span>
        </div>
      </div>

      {/* 🔥 MAP */}
      <MapContainer
        center={center as [number, number]}
        zoom={10}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds reports={filteredReports} />

        {filteredReports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={
              report.priority === "HIGH"
                ? createPulseIcon()
                : createIcon(getMarkerColor(report.priority))
            }
            eventHandlers={{
              click: () => navigate(`/reports/${report.id}`),
            }}
          >
            <Popup>
              <strong>{report.category}</strong> <br />
              {report.description || "No description"} <br />
              📍 {report.location.address || "No address"} <br />
              🔥 Priority: {report.priority}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}