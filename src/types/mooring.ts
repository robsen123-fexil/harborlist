export type MooringType = 'slip' | 'mooring' | 'dockside' | 'transient';

export type MooringStatus = 'waiting' | 'assigned' | 'docked' | 'departed';

export type MooringPriority = 'normal' | 'high' | 'urgent';

export interface MooringRequest {
  id: string;
  vesselName: string;
  mooringType: MooringType;
  status: MooringStatus;
  priority: MooringPriority;
  waitMinutes: number;
  captain: string;
  lengthFt: number;
}

export interface MooringFilters {
  type: MooringType | 'all';
  query: string;
}
