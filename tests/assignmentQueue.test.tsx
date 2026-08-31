import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    notes: 'Prefers port-side tie.',
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
    notes: 'Needs fuel dock pass.',
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
    notes: 'Annual slip holder.',
  },
];

describe('HarborDeck assignment queue', () => {
  beforeEach(() => {
    vi.mocked(useHarborArrivals).mockReturnValue({
      arrivals: MOCK_ARRIVALS,
      loading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('preserves queued vessels when mooring type chip narrows visible cards', async () => {
    const user = userEvent.setup();
    render(<HarborDeck initialArrivals={MOCK_ARRIVALS} />);

    await waitFor(() => {
      expect(screen.getByTestId('arrival-card-mr-001')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('queue-slip-mr-001'));
    await user.click(screen.getByTestId('queue-slip-mr-005'));

    expect(screen.getByTestId('queued-vessel-mr-001')).toBeInTheDocument();
    expect(screen.getByTestId('queued-vessel-mr-005')).toBeInTheDocument();

    await user.click(screen.getByTestId('type-chip-slip'));

    expect(screen.getByTestId('queued-vessel-mr-001')).toBeInTheDocument();
    expect(screen.getByTestId('queued-vessel-mr-005')).toBeInTheDocument();
  });

  it('preserves queued vessels when search query changes', async () => {
    const user = userEvent.setup();
    render(<HarborDeck initialArrivals={MOCK_ARRIVALS} />);

    await waitFor(() => {
      expect(screen.getByTestId('arrival-card-mr-002')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('queue-slip-mr-002'));

    expect(screen.getByTestId('queued-vessel-mr-002')).toBeInTheDocument();

    await user.type(screen.getByTestId('vessel-search'), 'northern');

    expect(screen.getByTestId('queued-vessel-mr-002')).toBeInTheDocument();
  });

  it('keeps queue aligned with vessel ids after arrivals refresh', async () => {
    const user = userEvent.setup();
    const reload = vi.fn();

    vi.mocked(useHarborArrivals).mockReturnValue({
      arrivals: MOCK_ARRIVALS,
      loading: false,
      error: null,
      reload,
    });

    const { rerender } = render(<HarborDeck initialArrivals={MOCK_ARRIVALS} />);

    await waitFor(() => {
      expect(screen.getByTestId('arrival-card-mr-002')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('queue-slip-mr-002'));
    expect(screen.getByTestId('queued-vessel-mr-002')).toBeInTheDocument();

    const refreshed = MOCK_ARRIVALS.map((a) =>
      a.id === 'mr-002' ? { ...a, waitMinutes: 125 } : a,
    );

    rerender(<HarborDeck initialArrivals={refreshed} />);

    expect(screen.getByTestId('queued-vessel-mr-002')).toBeInTheDocument();
  });
});
