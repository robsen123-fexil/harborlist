import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MooringBoard } from '@/components/MooringBoard';

vi.mock('@/hooks/useMooringQueue', () => ({
  useMooringQueue: vi.fn(),
}));

import { useMooringQueue } from '@/hooks/useMooringQueue';

describe('MooringBoard', () => {
  beforeEach(() => {
    vi.mocked(useMooringQueue).mockReturnValue({
      moorings: [
        {
          id: 'mr-001',
          vesselName: 'Sea Breeze',
          mooringType: 'slip',
          status: 'waiting',
          priority: 'normal',
          waitMinutes: 45,
          captain: 'A. Chen',
          lengthFt: 32,
        },
      ],
      loading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('renders the harbor wait board for Bayline Marina', async () => {
    render(<MooringBoard />);

    expect(screen.getByText('HarborList')).toBeInTheDocument();
    expect(screen.getByText(/Bayline Marina/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('mooring-table')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Mooring type')).toBeInTheDocument();
    expect(screen.getByTestId('queue-summary')).toBeInTheDocument();
  });
});
