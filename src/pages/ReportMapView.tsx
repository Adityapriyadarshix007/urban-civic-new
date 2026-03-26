// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import { Loader, ArrowLeft } from 'lucide-react';
// import { Navbar } from '@/components/Navbar';
// import { Footer } from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix Leaflet's broken default icon
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
// });

// // Component to fix map size after render
// const MapResizer = () => {
//   const map = useMap();
//   useEffect(() => {
//     setTimeout(() => {
//       map.invalidateSize();
//     }, 200);
//   }, [map]);
//   return null;
// };

// const ReportMapView = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [address, setAddress] = useState('');
//   const [category, setCategory] = useState('');

//   useEffect(() => {
//     const lat = parseFloat(searchParams.get('lat') || '');
//     const lng = parseFloat(searchParams.get('lng') || '');
//     const addr = searchParams.get('address') || '';
//     const cat = searchParams.get('category') || '';

//     if (!isNaN(lat) && !isNaN(lng)) {
//       setPosition([lat, lng]);
//       setAddress(addr);
//       setCategory(cat);
//     }

//     setLoading(false);
//   }, [searchParams]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader className="h-8 w-8 animate-spin text-urban-primary" />
//       </div>
//     );
//   }

//   if (!position) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <p className="text-lg font-semibold">Invalid or missing coordinates.</p>
//         <Button onClick={() => navigate('/reports')} className="mt-4">
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-6">
//         <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Report
//         </Button>

//         <h1 className="text-2xl font-bold mb-4">{category || 'Issue'} - Map View</h1>

//         <div className="h-[500px] w-full rounded-lg shadow overflow-hidden">
//           <MapContainer
//             center={position}
//             zoom={17}
//             scrollWheelZoom={true}
//             className="h-full w-full"
//           >
//             <MapResizer />
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
//             />
//             <Marker position={position}>
//               <Popup>
//                 {category || 'Issue'} <br />
//                 {address || 'No address provided'}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ReportMapView;


import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import ReportMap from '@/components/ReportMap';
import { Report } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ReportMapView() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const snapshot = await getDocs(collection(db, 'reports'));

      const data: Report[] = snapshot.docs.map(doc => {
        const d = doc.data();

        return {
          id: doc.id,
          userId: d.userId || '',
          userEmail: d.userEmail || '',
          category: d.category || 'Waste',

          location: {
            lat: d.location?.lat || 0,
            lng: d.location?.lng || 0,
            address: d.location?.address || '',
          },

          photo: d.photoUrl || d.photo || '',
          description: d.description || '',
          status: d.status || 'Pending',

          address: d.address || '',

          // 🔥 IMPORTANT
          priority: d.priority || "LOW",

          timestamp: d.timestamp || '',
          updatedAt: d.updatedAt || null,
          assignedTo: d.assignedTo || '',
        };
      });

      setReports(data);
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Civic Issues Map</h1>
        <ReportMap reports={reports} />
      </main>

      <Footer />
    </div>
  );
}
