import type { MooringRequest } from '@/types/mooring';

const MOCK_MOORINGS: MooringRequest[] = [
  {
    id: 'mr-001',
    vesselName: 'Sea Breeze',
    mooringType: 'slip',
    status: 'waiting',
    priority: 'normal',
    waitMinutes: 45,
    captain: 'A. Chen',
    lengthFt: 32,
    notes: 'Prefers port-side tie; arriving from south channel.',
  },
  {
    id: 'mr-002',
    vesselName: 'Northern Star',
    mooringType: 'mooring',
    status: 'waiting',
    priority: 'high',
    waitMinutes: 120,
    captain: 'M. Okonkwo',
    lengthFt: 28,
    notes: 'Needs fuel dock pass before mooring assignment.',
  },
  {
    id: 'mr-003',
    vesselName: 'Harbor Light',
    mooringType: 'dockside',
    status: 'assigned',
    priority: 'normal',
    waitMinutes: 15,
    captain: 'J. Rivera',
    lengthFt: 40,
    notes: 'Crew of four; short overnight stay.',
  },
  {
    id: 'mr-004',
    vesselName: 'Windward',
    mooringType: 'transient',
    status: 'waiting',
    priority: 'urgent',
    waitMinutes: 210,
    captain: 'S. Patel',
    lengthFt: 22,
    notes: 'Weather window closing — priority docking requested.',
  },
  {
    id: 'mr-005',
    vesselName: 'Bay Runner',
    mooringType: 'slip',
    status: 'waiting',
    priority: 'normal',
    waitMinutes: 90,
    captain: 'L. Nguyen',
    lengthFt: 36,
    notes: 'Annual slip holder; familiar with B pier layout.',
  },
  {
    id: 'mr-006',
    vesselName: 'Pelican',
    mooringType: 'mooring',
    status: 'docked',
    priority: 'normal',
    waitMinutes: 0,
    captain: 'R. Brooks',
    lengthFt: 26,
    notes: 'Already on mooring buoy M-14.',
  },
  {
    id: 'mr-007',
    vesselName: 'Tide Pool',
    mooringType: 'transient',
    status: 'waiting',
    priority: 'high',
    waitMinutes: 75,
    captain: 'E. Walsh',
    lengthFt: 30,
    notes: 'Day visitor; needs pump-out before departure.',
  },
  {
    id: 'mr-008',
    vesselName: 'Mariner',
    mooringType: 'dockside',
    status: 'waiting',
    priority: 'normal',
    waitMinutes: 55,
    captain: 'K. Olsen',
    lengthFt: 38,
    notes: 'Requires 50A shore power at dockside.',
  },
];

let requestCounter = 0;

function nextRequestId(): string {
  requestCounter += 1;
  return `req-${requestCounter}-${Date.now()}`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMoorings(): Promise<MooringRequest[]> {
  const requestId = nextRequestId();
  const latency = 80 + Math.floor(Math.random() * 120);
  await delay(latency);
  console.debug(`[fetchMoorings] ${requestId} completed in ${latency}ms`);
  return MOCK_MOORINGS.map((m) => ({ ...m }));
}

export async function refreshMooring(id: string): Promise<MooringRequest | null> {
  const requestId = nextRequestId();
  await delay(50);
  console.debug(`[refreshMooring] ${requestId} for ${id}`);
  const found = MOCK_MOORINGS.find((m) => m.id === id);
  return found ? { ...found } : null;
}

export { MOCK_MOORINGS };
