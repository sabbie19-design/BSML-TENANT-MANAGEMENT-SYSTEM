
export type UnitStatus = 'Occupied' | 'Vacant' | 'Maintenance' | 'ForSale';

export interface Unit {
  id: string;
  number: string;
  status: UnitStatus;
  ownerName: string;
  tenantName?: string;
  balance: number;
}

export interface Building {
  id: string;
  name: string;
  units: Unit[];
}

export interface Cluster {
  id: string;
  name: string;
  buildings: Building[];
}

export interface MaintenanceRequest {
  id: string;
  unitId: string;
  cluster: string;
  type: 'Plumbing' | 'Electrical' | 'Common Area' | 'Security' | 'Other';
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  date: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Visitor {
  id: string;
  name: string;
  unitVisited: string;
  purpose: string;
  arrivalTime: string;
  qrCode: string;
}

export interface BillingRecord {
  id: string;
  unitId: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Delinquent';
}
