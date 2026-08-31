import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MooringRequest, MooringType } from '@/types/mooring';
import { filterMoorings } from '@/utils/filterMoorings';
import { useHarborArrivals } from '@/hooks/useHarborArrivals';
import { SlipMapStrip } from './SlipMapStrip';
import { TypeChipBar } from './TypeChipBar';
import { ArrivalCard } from './ArrivalCard';
import { AssignmentRail } from './AssignmentRail';
import { QueueSummary } from './QueueSummary';

interface HarborDeckProps {
  marinaName?: string;
  initialArrivals?: MooringRequest[];
}

export function HarborDeck({
  marinaName = 'Bayline Marina',
  initialArrivals,
}: HarborDeckProps) {
  const { arrivals: fetched, loading, error, reload } = useHarborArrivals();
  const arrivals = initialArrivals ?? fetched;

  const [typeFilter, setTypeFilter] = useState<MooringType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [queuedIndices, setQueuedIndices] = useState<Set<number>>(new Set());

  const filtered = useMemo(
    () => filterMoorings(arrivals, { type: typeFilter, query: searchQuery }),
    [arrivals, typeFilter, searchQuery],
  );

  // BUG: clears assignment queue whenever chips or search change
  useEffect(() => {
    setQueuedIndices(new Set());
  }, [typeFilter, searchQuery]);

  // BUG: rebuilds queue from visible card indices when arrivals refresh
  useEffect(() => {
    setQueuedIndices((prev) => {
      const next = new Set<number>();
      prev.forEach((idx) => {
        if (idx < filtered.length) {
          next.add(idx);
        }
      });
      return next;
    });
  }, [filtered]);

  const queuedVessels = useMemo(
    () =>
      Array.from(queuedIndices)
        .map((idx) => filtered[idx])
        .filter((v): v is MooringRequest => Boolean(v)),
    [queuedIndices, filtered],
  );

  const toggleQueue = useCallback(
    (index: number) => {
      setQueuedIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [],
  );

  return (
    <div className="harbor-deck" data-testid="harbor-deck">
      <header className="harbor-deck__header">
        <h1>HarborList</h1>
        <p className="harbor-deck__subtitle">{marinaName} — Arrival deck</p>
      </header>

      <SlipMapStrip />
      <QueueSummary moorings={arrivals} />

      <div className="harbor-deck__toolbar">
        <TypeChipBar value={typeFilter} onChange={setTypeFilter} />
        <div className="harbor-deck__search">
          <label htmlFor="vessel-search">Find vessel</label>
          <input
            id="vessel-search"
            type="search"
            data-testid="vessel-search"
            placeholder="Vessel or captain…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {!initialArrivals && (
          <button type="button" onClick={reload} disabled={loading}>
            Refresh
          </button>
        )}
      </div>

      {loading && !initialArrivals && <p data-testid="loading">Loading arrivals…</p>}
      {error && <p role="alert">{error}</p>}

      <div className="harbor-deck__body">
        <section className="harbor-deck__grid" aria-label="Arrival cards">
          {!loading && filtered.length === 0 && (
            <p className="harbor-deck__empty">No arrivals match the current filters.</p>
          )}
          {!loading &&
            filtered.map((vessel, index) => (
              <ArrivalCard
                key={vessel.id}
                vessel={vessel}
                queued={queuedIndices.has(index)}
                onQueue={() => toggleQueue(index)}
              />
            ))}
        </section>

        <AssignmentRail vessels={queuedVessels} />
      </div>
    </div>
  );
}
