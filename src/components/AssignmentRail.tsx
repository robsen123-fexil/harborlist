import type { MooringRequest } from '@/types/mooring';
import { formatLength } from '@/utils/formatWaitTime';

interface AssignmentRailProps {
  vessels: MooringRequest[];
}

export function AssignmentRail({ vessels }: AssignmentRailProps) {
  return (
    <aside className="assignment-rail" data-testid="assignment-rail" aria-label="Slip assignment queue">
      <h2 className="assignment-rail__title">Assignment queue</h2>
      {vessels.length === 0 ? (
        <p className="assignment-rail__empty">No vessels queued. Use &ldquo;Queue for slip&rdquo; on arrival cards.</p>
      ) : (
        <ul className="assignment-rail__list">
          {vessels.map((vessel) => (
            <li
              key={vessel.id}
              className="assignment-rail__item"
              data-testid={`queued-vessel-${vessel.id}`}
            >
              <span className="assignment-rail__vessel">{vessel.vesselName}</span>
              <span className="assignment-rail__detail">
                {vessel.mooringType} · {formatLength(vessel.lengthFt)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="assignment-rail__count" role="status">
        {vessels.length} vessel{vessels.length === 1 ? '' : 's'} queued
      </p>
    </aside>
  );
}
