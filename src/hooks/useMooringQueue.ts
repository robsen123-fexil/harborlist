import { useCallback, useEffect, useState } from 'react';
import { fetchMoorings } from '@/api/fetchMoorings';
import type { MooringRequest } from '@/types/mooring';

interface MooringQueueState {
  moorings: MooringRequest[];
  loading: boolean;
  error: string | null;
}

export function useMooringQueue() {
  const [state, setState] = useState<MooringQueueState>({
    moorings: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const moorings = await fetchMoorings();
      setState({ moorings, loading: false, error: null });
    } catch (err) {
      setState({
        moorings: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load moorings',
      });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
