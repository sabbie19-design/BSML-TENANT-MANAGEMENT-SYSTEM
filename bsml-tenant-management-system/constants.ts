
import { Cluster, MaintenanceRequest, BillingRecord, Visitor, UnitStatus } from './types';

// Fix: Import UnitStatus and added a type cast for the status property to resolve the string-to-union-type mismatch.
export const CLUSTERS: Cluster[] = Array.from({ length: 7 }, (_, i) => ({
  id: `c${i + 1}`,
  name: `Cluster ${i + 1}`,
  buildings: Array.from({ length: i % 2 === 0 ? 2 : 3 }, (_, j) => ({
    id: `c${i + 1}-b${j + 1}`,
    name: `Building ${j + 1}`,
    units: Array.from({ length: 12 }, (_, k) => ({
      id: `u-${i + 1}-${j + 1}-${k + 1}`,
      number: `${(k + 1).toString().padStart(3, '0')}`,
      status: (Math.random() > 0.2 ? 'Occupied' : (Math.random() > 0.5 ? 'Vacant' : 'Maintenance')) as UnitStatus,
      ownerName: `Owner ${k + 1}`,
      tenantName: Math.random() > 0.3 ? `Tenant ${k + 1}` : undefined,
      balance: Math.random() > 0.8 ? Math.floor(Math.random() * 5000) : 0,
    }))
  }))
})).slice(0, 7);

export const MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'req-1',
    unitId: '101',
    cluster: 'Cluster 1',
    type: 'Plumbing',
    description: 'Leaking pipe in the kitchen sink.',
    status: 'Open',
    date: '2023-10-25',
    priority: 'High'
  },
  {
    id: 'req-2',
    unitId: '204',
    cluster: 'Cluster 3',
    type: 'Electrical',
    description: 'Main breaker keeps tripping.',
    status: 'In Progress',
    date: '2023-10-24',
    priority: 'Medium'
  }
];

export const RECENT_VISITORS: Visitor[] = [
  { id: 'v1', name: 'John Doe', unitVisited: 'C1-B2-101', purpose: 'Delivery', arrivalTime: '10:45 AM', qrCode: 'QR_123' },
  { id: 'v2', name: 'Sarah Smith', unitVisited: 'C4-B1-502', purpose: 'Personal', arrivalTime: '11:15 AM', qrCode: 'QR_456' },
];

export const COLORS = {
  Occupied: 'bg-green-100 text-green-700 border-green-200',
  Vacant: 'bg-slate-100 text-slate-700 border-slate-200',
  Maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  ForSale: 'bg-blue-100 text-blue-700 border-blue-200',
  Paid: 'text-green-600 bg-green-50',
  Pending: 'text-amber-600 bg-amber-50',
  Delinquent: 'text-red-600 bg-red-50',
};