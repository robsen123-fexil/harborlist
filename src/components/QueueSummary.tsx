import type { MooringRequest } from '@/types/mooring';
import { countByStatus } from '@/utils/filterMoorings';

interface QueueSummaryProps {
  moorings: MooringRequest[];
}

export function QueueSummary({ moorings }: QueueSummaryProps) {
  const counts = countByStatus(moorings);

  return (
    <div className="queue-summary" data-testid="queue-summary">
      <span className="queue-summary__item">
        <strong>{moorings.length}</strong> total
      </span>
      <span className="queue-summary__item">
        <strong>{counts.waiting ?? 0}</strong> waiting
      </span>
      <span className="queue-summary__item">
        <strong>{counts.assigned ?? 0}</strong> assigned
      </span>
      <span className="queue-summary__item">
        <strong>{counts.docked ?? 0}</strong> docked
      </span>
    </div>
  );
}
