import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarborDeck } from '@/components/HarborDeck';
import type { MooringRequest } from '@/types/mooring';

vi.mock('@/hooks/useHarborArrivals', () => ({
  useHarborArrivals: vi.fn(),
}));

import { useHarborArrivals } from '@/hooks/useHarborArrivals';

const MOCK_ARRIVALS: MooringRequest[] = [
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
];

describe('HarborDeck', () => {
  beforeEach(() => {
    vi.mocked(useHarborArrivals).mockReturnValue({
      arrivals: MOCK_ARRIVALS,
      loading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('renders arrival cards after load', async () => {
    render(<HarborDeck initialArrivals={MOCK_ARRIVALS} />);

    await waitFor(() => {
      expect(screen.getByTestId('harbor-deck')).toBeInTheDocument();
    });

    expect(screen.getByTestId('arrival-card-mr-001')).toBeInTheDocument();
    expect(screen.getByTestId('arrival-card-mr-002')).toBeInTheDocument();
    expect(screen.getByText('Sea Breeze')).toBeInTheDocument();
    expect(screen.getByText('Northern Star')).toBeInTheDocument();
  });

  it('shows slip map strip and assignment rail', async () => {
    render(<HarborDeck initialArrivals={MOCK_ARRIVALS} />);

    await waitFor(() => {
      expect(screen.getByTestId('slip-map-strip')).toBeInTheDocument();
    });

    expect(screen.getByTestId('assignment-rail')).toBeInTheDocument();
    expect(screen.getByTestId('type-chip-all')).toBeInTheDocument();
  });
});
