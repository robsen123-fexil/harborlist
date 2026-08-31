import type { MooringStatus } from '@/types/mooring';

const STATUS_LABELS: Record<MooringStatus, string> = {
  waiting: 'Waiting',
  assigned: 'Assigned',
  docked: 'Docked',
  departed: 'Departed',
};

const STATUS_CLASS: Record<MooringStatus, string> = {
  waiting: 'status-chip--waiting',
  assigned: 'status-chip--assigned',
  docked: 'status-chip--docked',
  departed: 'status-chip--departed',
};

interface StatusChipProps {
  status: MooringStatus;
}

export function StatusChip({ status }: StatusChipProps) {
  return (
    <span className={`status-chip ${STATUS_CLASS[status]}`} data-testid={`status-${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
