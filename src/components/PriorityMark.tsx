import type { MooringPriority } from '@/types/mooring';

const PRIORITY_LABELS: Record<MooringPriority, string> = {
  normal: '',
  high: 'High',
  urgent: 'Urgent',
};

interface PriorityMarkProps {
  priority: MooringPriority;
}

export function PriorityMark({ priority }: PriorityMarkProps) {
  if (priority === 'normal') return null;

  return (
    <span
      className={`priority-mark priority-mark--${priority}`}
      data-testid={`priority-${priority}`}
      title={`${PRIORITY_LABELS[priority]} priority`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
