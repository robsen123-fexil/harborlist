import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MooringBoard } from '@/components/MooringBoard';
import type { MooringRequest } from '@/types/mooring';

vi.mock('@/hooks/useMooringQueue', () => ({
  useMooringQueue: vi.fn(),
}));

import { useMooringQueue } from '@/hooks/useMooringQueue';

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
  },
];

describe('MooringBoard selection integration', () => {
  beforeEach(() => {
    vi.mocked(useMooringQueue).mockReturnValue({
      moorings: MOCK_MOORINGS,
      loading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('keeps vessel checkboxes selected after changing Mooring type filter', async () => {
    const user = userEvent.setup();
    render(<MooringBoard initialMoorings={MOCK_MOORINGS} />);

    await waitFor(() => {
      expect(screen.getByTestId('mooring-table')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('select-mr-001'));
    await user.click(screen.getByTestId('select-mr-005'));

    expect(screen.getByTestId('select-mr-001')).toBeChecked();
    expect(screen.getByTestId('select-mr-005')).toBeChecked();
    expect(screen.getByTestId('selection-tray')).toHaveTextContent(
      '2 requests selected for assignment',
    );

    const filter = screen.getByLabelText('Mooring type');
    await user.selectOptions(filter, 'slip');

    expect(screen.getByTestId('select-mr-001')).toBeChecked();
    expect(screen.getByTestId('select-mr-005')).toBeChecked();
    expect(screen.getByTestId('selection-tray')).toHaveTextContent(
      '2 requests selected for assignment',
    );
  });
});
