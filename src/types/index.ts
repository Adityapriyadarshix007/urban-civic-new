import { ReactNode } from "react";

export type ReportStatus = 'Pending' | 'In Progress' | 'Fixed';

export type ReportCategory = 'Waste' | 'Pothole' | 'Leak' | 'Streetlight';

// export interface Report {
//   address: ReactNode;
//   id: string;
//   userId: string;
//   category: ReportCategory;
//   location: {
//     lat: number;
//     lng: number;
//     address?: string;
//   };
//   photo: string;
//   description?: string;
//   status: ReportStatus;
//   timestamp: string;
//   updatedAt?: string;
//   assignedTo?: string;
// }

export interface Report {
  id: string;
  userId: string;
  userEmail: string; // ✅ ADD THIS

  category: 'Waste' | 'Pothole' | 'Leak' | 'Streetlight';
  priority: "LOW" | "MEDIUM" | "HIGH";

  location: {
    lat: number;
    lng: number;
    address?: string;
  };

  photo: string;
  description?: string;

  status: 'Pending' | 'In Progress' | 'Fixed';

  address?: string; // ✅ ADD THIS LINE

  timestamp: string;
  updatedAt?: string;
  assignedTo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
