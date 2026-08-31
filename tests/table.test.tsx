import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MooringTable } from '@/components/MooringTable';
import type { MooringRequest } from '@/types/mooring';

const SAMPLE_ROWS: MooringRequest[] = [
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
    id: 'mr-003',
    vesselName: 'Harbor Light',
    mooringType: 'dockside',
    status: 'assigned',
    priority: 'normal',
    waitMinutes: 15,
    captain: 'J. Rivera',
    lengthFt: 40,
  },
];

describe('MooringTable selection', () => {
  it('preserves selection when filter narrows visible rows', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    const { rerender } = render(
      <MooringTable
        rows={SAMPLE_ROWS}
        visits={SAMPLE_ROWS}
        type="all"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByTestId('select-mr-001'));
    await user.click(screen.getByTestId('select-mr-002'));

    expect(screen.getByTestId('select-mr-001')).toBeChecked();
    expect(screen.getByTestId('select-mr-002')).toBeChecked();

    const slipOnly = SAMPLE_ROWS.filter((r) => r.mooringType === 'slip');
    rerender(
      <MooringTable
        rows={slipOnly}
        visits={SAMPLE_ROWS}
        type="slip"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    expect(screen.getByTestId('select-mr-001')).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      expect.arrayContaining(['mr-001', 'mr-002']),
    );
  });

  it('preserves selection when filter widens back to all types', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    const slipOnly = SAMPLE_ROWS.filter((r) => r.mooringType === 'slip');

    const { rerender } = render(
      <MooringTable
        rows={slipOnly}
        visits={SAMPLE_ROWS}
        type="slip"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByTestId('select-mr-001'));

    rerender(
      <MooringTable
        rows={SAMPLE_ROWS}
        visits={SAMPLE_ROWS}
        type="all"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    expect(screen.getByTestId('select-mr-001')).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(['mr-001']);
  });

  it('keeps selection aligned with vessel ids after data refresh', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    const { rerender } = render(
      <MooringTable
        rows={SAMPLE_ROWS}
        visits={SAMPLE_ROWS}
        type="all"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByTestId('select-mr-002'));

    const refreshed = SAMPLE_ROWS.map((r) =>
      r.id === 'mr-002' ? { ...r, waitMinutes: 125 } : r,
    );

    rerender(
      <MooringTable
        rows={refreshed}
        visits={refreshed}
        type="all"
        query=""
        onSelectionChange={onSelectionChange}
      />,
    );

    expect(screen.getByTestId('select-mr-002')).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(['mr-002']);
  });
});

describe('MooringTable rendering', () => {
  it('renders vessel names in rows', () => {
    render(<MooringTable rows={SAMPLE_ROWS} visits={SAMPLE_ROWS} type="all" query="" />);
    expect(screen.getByText('Sea Breeze')).toBeInTheDocument();
    expect(screen.getByText('Northern Star')).toBeInTheDocument();
  });
});
