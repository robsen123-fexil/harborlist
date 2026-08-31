import { describe, it, expect } from 'vitest';
import { filterMoorings, countByStatus, countByType } from '@/utils/filterMoorings';
import type { MooringRequest } from '@/types/mooring';

const FIXTURE: MooringRequest[] = [
  {
    id: 'mr-001',
    vesselName: 'Sea Breeze',
    mooringType: 'slip',
    status: 'waiting',
    priority: 'normal',
    waitMinutes: 45,
    captain: 'A. Chen',
    lengthFt: 32,
    notes: '',
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
    notes: '',
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
    notes: '',
  },
];

describe('filterMoorings', () => {
  it('returns all moorings when filters are default', () => {
    const result = filterMoorings(FIXTURE, { type: 'all', query: '' });
    expect(result).toHaveLength(3);
  });

  it('filters by mooring type', () => {
    const result = filterMoorings(FIXTURE, { type: 'slip', query: '' });
    expect(result).toHaveLength(1);
    expect(result[0].vesselName).toBe('Sea Breeze');
  });

  it('filters by vessel name query', () => {
    const result = filterMoorings(FIXTURE, { type: 'all', query: 'northern' });
    expect(result).toHaveLength(1);
    expect(result[0].vesselName).toBe('Northern Star');
  });

  it('filters by captain name query', () => {
    const result = filterMoorings(FIXTURE, { type: 'all', query: 'rivera' });
    expect(result).toHaveLength(1);
    expect(result[0].captain).toBe('J. Rivera');
  });
});

describe('countByStatus', () => {
  it('counts moorings by status', () => {
    expect(countByStatus(FIXTURE)).toEqual({ waiting: 2, assigned: 1 });
  });
});

describe('countByType', () => {
  it('counts moorings by type', () => {
    expect(countByType(FIXTURE)).toEqual({ slip: 1, mooring: 1, dockside: 1 });
  });
});
