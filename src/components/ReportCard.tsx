// import {
//   Clock,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   Loader,
//   Trash2,
//   Droplet,
//   LampFloor
// } from 'lucide-react';
// import { format } from 'date-fns';
// import { Report } from '@/types';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// interface ReportCardProps {
//   report: Report;
//   viewMode?: 'compact' | 'full';
//   onClick?: () => void;
// }

// export function ReportCard({ report, viewMode = 'full', onClick }: ReportCardProps) {
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'Waste':
//         return <Trash2 className="h-5 w-5" />;
//       case 'Pothole':
//         return <AlertCircle className="h-5 w-5" />;
//       case 'Leak':
//         return <Droplet className="h-5 w-5" />;
//       case 'Streetlight':
//         return <LampFloor className="h-5 w-5" />;
//       default:
//         return <AlertCircle className="h-5 w-5" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'Pending':
//         return (
//           <Badge className="status-pending flex items-center gap-1">
//             <Clock className="h-3 w-3" />
//             <span>Pending</span>
//           </Badge>
//         );
//       case 'In Progress':
//         return (
//           <Badge className="status-in-progress flex items-center gap-1">
//             <Loader className="h-3 w-3" />
//             <span>In Progress</span>
//           </Badge>
//         );
//       case 'Fixed':
//         return (
//           <Badge className="status-fixed flex items-center gap-1">
//             <CheckCircle className="h-3 w-3" />
//             <span>Fixed</span>
//           </Badge>
//         );
//       default:
//         return <Badge>{status}</Badge>;
//     }
//   };

//   const getFormattedDate = (value: any): string => {
//     try {
//       const date = value?.toDate?.() || new Date(value);
//       return isNaN(date.getTime()) ? 'Unknown' : format(date, 'MMM d, yyyy');
//     } catch {
//       return 'Unknown';
//     }
//   };

//   const getLocationText = () => {
//     if (report.location?.address) return report.location.address;
//     if (report.location?.lat && report.location?.lng) {
//       return `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`;
//     }
//     return 'Unknown location';
//   };

//   return (
//     <Card
//       className={`overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex flex-col sm:flex-row">
//         {viewMode === 'full' && (
//           <div className="relative w-full sm:w-1/3 min-h-[10rem] bg-muted">
//             <img
//               src={report.photo || '/placeholder.svg'}
//               alt={`${report.category} issue`}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-2 left-2">
//               {report.status && getStatusBadge(report.status)}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col flex-1">
//           <CardHeader className="flex flex-row items-center justify-between p-4">
//             <div className="flex items-center space-x-2">
//               <div className="p-1 bg-muted/80 rounded-full">
//                 {getCategoryIcon(report.category)}
//               </div>
//               <div>
//                 <h4 className="font-medium text-base">{report.category} Issue</h4>
//                 {viewMode === 'compact' && report.status && (
//                   <div className="mt-1">
//                     {getStatusBadge(report.status)}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="text-xs text-muted-foreground">
//               {getFormattedDate(report.timestamp)}
//             </div>
//           </CardHeader>

//           <CardContent className="p-4 pt-0">
//             {report.description && viewMode === 'full' && (
//               <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
//                 {report.description}
//               </p>
//             )}

//             <div className="flex items-center text-xs text-muted-foreground">
//               <MapPin className="h-3 w-3 mr-1" />
//               <span className="truncate">{getLocationText()}</span>
//             </div>
//           </CardContent>

//           {viewMode === 'full' && (
//             <CardFooter className="p-4 pt-0 flex items-center justify-between">
//               <div className="text-xs text-muted-foreground">
//                 Updated: {getFormattedDate(report.updatedAt || report.timestamp)}
//               </div>
//               {report.assignedTo && (
//                 <Badge variant="outline" className="text-xs">
//                   Assigned
//                 </Badge>
//               )}
//             </CardFooter>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

// import {
//   Clock,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   Loader,
//   Trash2,
//   Droplet,
//   LampFloor
// } from 'lucide-react';
// import { format } from 'date-fns';
// import { Report } from '@/types';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { db } from '@/firebaseConfig';
// import { doc, updateDoc } from 'firebase/firestore';
// import { useState } from 'react';
// import { useToast } from '@/hooks/use-toast';

// interface ReportCardProps {
//   report: Report;
//   viewMode?: 'compact' | 'full';
//   onClick?: () => void;
// }

// export function ReportCard({ report, viewMode = 'full', onClick }: ReportCardProps) {
//   const [updating, setUpdating] = useState(false);
//   const { toast } = useToast();

//   // const updateStatus = async (newStatus: string) => {
//   //   try {
//   //     setUpdating(true);
//   //     await updateDoc(doc(db, "reports", report.id), {
//   //       status: newStatus,
//   //       updatedAt: new Date().toISOString()
//   //     });
//   //   } catch (err) {
//   //     console.error("Status update failed:", err);
//   //   } finally {
//   //     setUpdating(false);
//   //   }
//   // };

//   const updateStatus = async (newStatus: string) => {
//     try {
//       setUpdating(true);
//       await updateDoc(doc(db, "reports", report.id), {
//         status: newStatus,
//         updatedAt: new Date().toISOString()
//       });

//       toast({
//         title: "Status updated",
//         description: `Marked as ${newStatus}`,
//       });

//     } catch (err) {
//       console.error("Status update failed:", err);

//       toast({
//         variant: "destructive",
//         title: "Update failed",
//         description: "Could not update status",
//       });

//     } finally {
//       setUpdating(false);
//     }
//   };

//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'Waste': return <Trash2 className="h-5 w-5" />;
//       case 'Pothole': return <AlertCircle className="h-5 w-5" />;
//       case 'Leak': return <Droplet className="h-5 w-5" />;
//       case 'Streetlight': return <LampFloor className="h-5 w-5" />;
//       default: return <AlertCircle className="h-5 w-5" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'Pending':
//         return <Badge className="status-pending flex gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
//       case 'In Progress':
//         return <Badge className="status-in-progress flex gap-1"><Loader className="h-3 w-3" />In Progress</Badge>;
//       case 'Fixed':
//         return <Badge className="status-fixed flex gap-1"><CheckCircle className="h-3 w-3" />Fixed</Badge>;
//       default:
//         return <Badge>{status}</Badge>;
//     }
//   };

//   const getFormattedDate = (value: any): string => {
//     try {
//       const date = value?.toDate?.() || new Date(value);
//       return isNaN(date.getTime()) ? 'Unknown' : format(date, 'MMM d, yyyy');
//     } catch {
//       return 'Unknown';
//     }
//   };

//   const getLocationText = () => {
//     if (report.location?.address) return report.location.address;
//     if (report.location?.lat && report.location?.lng) {
//       return `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`;
//     }
//     return 'Unknown location';
//   };

//   const getPriorityBadge = (priority: string) => {
//     switch (priority) {
//       case "HIGH":
//         return <Badge className="bg-red-500 text-white">HIGH</Badge>;
//       case "MEDIUM":
//         return <Badge className="bg-yellow-500 text-black">MEDIUM</Badge>;
//       case "LOW":
//         return <Badge className="bg-green-500 text-white">LOW</Badge>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="overflow-hidden">
//       <div className="flex flex-col sm:flex-row">

//         {viewMode === 'full' && (
//           <div className="relative w-full sm:w-1/3 min-h-[10rem] bg-muted">
//             <img
//               src={report.photo || '/placeholder.svg'}
//               alt="report"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-2 left-2">
//               {getStatusBadge(report.status)}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col flex-1">
//           <CardHeader className="flex justify-between p-4">
//             <div className="flex items-center space-x-2">
//               {getCategoryIcon(report.category)}
//               <h4>{report.category} Issue</h4>
//               {getPriorityBadge(report.priority)}
//             </div>
//             <div className="text-xs text-muted-foreground">
//               {getFormattedDate(report.timestamp)}
//             </div>
//           </CardHeader>

//           <CardContent className="p-4 pt-0">
//             {report.description && (
//               <p className="text-sm text-muted-foreground mb-2">
//                 {report.description}
//               </p>
//             )}
//             <div className="text-xs flex items-center">
//               <MapPin className="h-3 w-3 mr-1" />
//               {getLocationText()}
//             </div>
//           </CardContent>

//           {/* 🔥 ADMIN CONTROLS */}
//           <CardFooter className="flex gap-2 flex-wrap">

//             <Button
//               size="sm"
//               disabled={updating || report.status === "Pending"}
//               onClick={() => updateStatus("Pending")}
//             >
//               {updating && report.status !== "Pending" ? "Updating..." : "Pending"}
//             </Button>

//             <Button
//               size="sm"
//               disabled={updating || report.status === "In Progress"}
//               onClick={() => updateStatus("In Progress")}
//             >
//               {updating && report.status !== "In Progress" ? "Updating..." : "In Progress"}
//             </Button>

//             <Button
//               size="sm"
//               disabled={updating || report.status === "Fixed"}
//               onClick={() => updateStatus("Fixed")}
//             >
//               {updating && report.status !== "Fixed" ? "Updating..." : "Fixed"}
//             </Button>

//           </CardFooter>
//         </div>

//       </div>
//     </Card>
//   );
// }



import {
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader,
  Trash2,
  Droplet,
  LampFloor
} from 'lucide-react';
import { format } from 'date-fns';
import { Report } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReportCardProps {
  report: Report;
  viewMode?: 'compact' | 'full';
  onClick?: () => void;
}

export function ReportCard({ report, viewMode = 'full', onClick }: ReportCardProps) {
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  // 🔥 STATUS UPDATE (EXISTING)
  const updateStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      await updateDoc(doc(db, "reports", report.id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "Status updated",
        description: `Marked as ${newStatus}`,
      });

    } catch (err) {
      console.error("Status update failed:", err);

      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update status",
      });

    } finally {
      setUpdating(false);
    }
  };

  // 🔥🔥 NEW: PRIORITY UPDATE FUNCTION
  const updatePriority = async (newPriority: string) => {
    try {
      setUpdating(true);
      await updateDoc(doc(db, "reports", report.id), {
        priority: newPriority,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "Priority updated",
        description: `Changed to ${newPriority}`,
      });

    } catch (err) {
      console.error("Priority update failed:", err);

      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update priority",
      });

    } finally {
      setUpdating(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Waste': return <Trash2 className="h-5 w-5" />;
      case 'Pothole': return <AlertCircle className="h-5 w-5" />;
      case 'Leak': return <Droplet className="h-5 w-5" />;
      case 'Streetlight': return <LampFloor className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="status-pending flex gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'In Progress':
        return <Badge className="status-in-progress flex gap-1"><Loader className="h-3 w-3" />In Progress</Badge>;
      case 'Fixed':
        return <Badge className="status-fixed flex gap-1"><CheckCircle className="h-3 w-3" />Fixed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFormattedDate = (value: any): string => {
    try {
      const date = value?.toDate?.() || new Date(value);
      return isNaN(date.getTime()) ? 'Unknown' : format(date, 'MMM d, yyyy');
    } catch {
      return 'Unknown';
    }
  };

  const getLocationText = () => {
    if (report.location?.address) return report.location.address;
    if (report.location?.lat && report.location?.lng) {
      return `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`;
    }
    return 'Unknown location';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <Badge className="bg-red-500 text-white">HIGH</Badge>;
      case "MEDIUM":
        return <Badge className="bg-yellow-500 text-black">MEDIUM</Badge>;
      case "LOW":
        return <Badge className="bg-green-500 text-white">LOW</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">

        {viewMode === 'full' && (
          <div className="relative w-full sm:w-1/3 min-h-[10rem] bg-muted">
            <img
              src={report.photo || '/placeholder.svg'}
              alt="report"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              {getStatusBadge(report.status)}
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1">
          <CardHeader className="flex justify-between p-4">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(report.category)}
              <h4>{report.category} Issue</h4>
              {getPriorityBadge(report.priority)}
            </div>
            <div className="text-xs text-muted-foreground">
              {getFormattedDate(report.timestamp)}
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            {report.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {report.description}
              </p>
            )}
            <div className="text-xs flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {getLocationText()}
            </div>
          </CardContent>

          {/* 🔥 ADMIN CONTROLS */}
          <CardFooter className="flex gap-2 flex-wrap">

            {/* STATUS BUTTONS */}
            <Button size="sm" disabled={updating || report.status === "Pending"} onClick={() => updateStatus("Pending")}>
              Pending
            </Button>

            <Button size="sm" disabled={updating || report.status === "In Progress"} onClick={() => updateStatus("In Progress")}>
              In Progress
            </Button>

            <Button size="sm" disabled={updating || report.status === "Fixed"} onClick={() => updateStatus("Fixed")}>
              Fixed
            </Button>

            {/* 🔥🔥 NEW PRIORITY BUTTONS */}
            <Button size="sm" variant="destructive" onClick={() => updatePriority("HIGH")}>
              🔥 High
            </Button>

            <Button size="sm" className="bg-yellow-500 text-black" onClick={() => updatePriority("MEDIUM")}>
              ⚠️ Medium
            </Button>

            <Button size="sm" className="bg-green-600 text-white" onClick={() => updatePriority("LOW")}>
              ✅ Low
            </Button>

          </CardFooter>
        </div>

      </div>
    </Card>
  );
}