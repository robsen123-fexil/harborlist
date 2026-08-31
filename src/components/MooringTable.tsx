import { useCallback, useEffect, useState } from 'react';
import type { MooringRequest } from '@/types/mooring';
import { StatusChip } from './StatusChip';
import { PriorityMark } from './PriorityMark';
import { formatWaitTime, formatLength } from '@/utils/formatWaitTime';

interface MooringTableProps {
  rows: MooringRequest[];
  visits: MooringRequest[];
  type: string;
  query: string;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function MooringTable({
  rows,
  visits: _visits,
  type,
  query,
  onSelectionChange,
}: MooringTableProps) {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  // BUG: clears all selections whenever the filter changes
  useEffect(() => {
    setSelectedIndices(new Set());
  }, [type, query]);

  // BUG: rebuilds selection from row indices when rows change
  useEffect(() => {
    setSelectedIndices((prev) => {
      const next = new Set<number>();
      prev.forEach((idx) => {
        if (idx < rows.length) {
          next.add(idx);
        }
      });
      return next;
    });
  }, [rows]);

  useEffect(() => {
    if (onSelectionChange) {
      const ids = Array.from(selectedIndices)
        .map((idx) => rows[idx]?.id)
        .filter((id): id is string => Boolean(id));
      onSelectionChange(ids);
    }
  }, [selectedIndices, rows, onSelectionChange]);

  const toggleRow = useCallback((index: number) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  if (rows.length === 0) {
    return <p className="mooring-table__empty">No mooring requests match the current filters.</p>;
  }

  return (
    <table className="mooring-table" data-testid="mooring-table">
      <thead>
        <tr>
          <th scope="col">
            <span className="sr-only">Select</span>
          </th>
          <th scope="col">Vessel</th>
          <th scope="col">Captain</th>
          <th scope="col">Type</th>
          <th scope="col">Length</th>
          <th scope="col">Wait</th>
          <th scope="col">Status</th>
          <th scope="col">Priority</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id} data-testid={`mooring-row-${row.id}`}>
            <td>
              <input
                type="checkbox"
                aria-label={`Select ${row.vesselName}`}
                checked={selectedIndices.has(index)}
                onChange={() => toggleRow(index)}
                data-testid={`select-${row.id}`}
              />
            </td>
            <td>{row.vesselName}</td>
            <td>{row.captain}</td>
            <td>{row.mooringType}</td>
            <td>{formatLength(row.lengthFt)}</td>
            <td>{formatWaitTime(row.waitMinutes)}</td>
            <td>
              <StatusChip status={row.status} />
            </td>
            <td>
              <PriorityMark priority={row.priority} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
