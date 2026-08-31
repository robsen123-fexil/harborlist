import { useState } from 'react';
import type { MooringRequest } from '@/types/mooring';
import { StatusChip } from './StatusChip';
import { PriorityMark } from './PriorityMark';
import { formatWaitTime, formatLength } from '@/utils/formatWaitTime';

interface ArrivalCardProps {
  vessel: MooringRequest;
  queued: boolean;
  onQueue: () => void;
}

export function ArrivalCard({ vessel, queued, onQueue }: ArrivalCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`arrival-card ${expanded ? 'arrival-card--expanded' : ''} ${queued ? 'arrival-card--queued' : ''}`}
      data-testid={`arrival-card-${vessel.id}`}
    >
      <button
        type="button"
        className="arrival-card__header"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span className="arrival-card__name">{vessel.vesselName}</span>
        <span className="arrival-card__meta">
          <StatusChip status={vessel.status} />
          <PriorityMark priority={vessel.priority} />
          <span className="arrival-card__wait">{formatWaitTime(vessel.waitMinutes)}</span>
        </span>
      </button>

      {expanded && (
        <div className="arrival-card__detail" data-testid={`arrival-detail-${vessel.id}`}>
          <dl>
            <div>
              <dt>Captain</dt>
              <dd>{vessel.captain}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{formatLength(vessel.lengthFt)}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{vessel.mooringType}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{vessel.notes || '—'}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="arrival-card__actions">
        <button
          type="button"
          className="arrival-card__queue-btn"
          data-testid={`queue-slip-${vessel.id}`}
          aria-pressed={queued}
          onClick={(e) => {
            e.stopPropagation();
            onQueue();
          }}
        >
          {queued ? 'Queued' : 'Queue for slip'}
        </button>
      </div>
    </article>
  );
}
