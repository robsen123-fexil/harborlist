import { useMemo, useState } from 'react';
import type { MooringRequest, MooringType } from '@/types/mooring';
import { filterMoorings } from '@/utils/filterMoorings';
import { MooringFilter } from './MooringFilter';
import { MooringSearch } from './MooringSearch';
import { MooringTable } from './MooringTable';
import { QueueSummary } from './QueueSummary';
import { SelectionTray } from './SelectionTray';
import { useMooringQueue } from '@/hooks/useMooringQueue';

interface MooringBoardProps {
  marinaName?: string;
  initialMoorings?: MooringRequest[];
}

export function MooringBoard({
  marinaName = 'Bayline Marina',
  initialMoorings,
}: MooringBoardProps) {
  const { moorings: fetched, loading, error, reload } = useMooringQueue();
  const moorings = initialMoorings ?? fetched;

  const [typeFilter, setTypeFilter] = useState<MooringType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(
    () => filterMoorings(moorings, { type: typeFilter, query: searchQuery }),
    [moorings, typeFilter, searchQuery],
  );

  return (
    <div className="mooring-board" data-testid="mooring-board">
      <header className="mooring-board__header">
        <h1>HarborList</h1>
        <p className="mooring-board__subtitle">{marinaName} — Mooring wait board</p>
      </header>

      <QueueSummary moorings={moorings} />

      <div className="mooring-board__controls">
        <MooringFilter value={typeFilter} onChange={setTypeFilter} />
        <MooringSearch value={searchQuery} onChange={setSearchQuery} />
        {!initialMoorings && (
          <button type="button" onClick={reload} disabled={loading}>
            Refresh
          </button>
        )}
      </div>

      <SelectionTray count={selectedIds.length} />

      {loading && !initialMoorings && <p data-testid="loading">Loading moorings…</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && (
        <MooringTable
          rows={filtered}
          visits={moorings}
          type={typeFilter}
          query={searchQuery}
          onSelectionChange={setSelectedIds}
        />
      )}
    </div>
  );
}
