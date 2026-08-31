import { useCallback, useEffect, useState } from 'react';
import { fetchMoorings } from '@/api/fetchMoorings';
import type { MooringRequest } from '@/types/mooring';

interface HarborArrivalsState {
  arrivals: MooringRequest[];
  loading: boolean;
  error: string | null;
}

export function useHarborArrivals() {
  const [state, setState] = useState<HarborArrivalsState>({
    arrivals: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const arrivals = await fetchMoorings();
      setState({ arrivals, loading: false, error: null });
    } catch (err) {
      setState({
        arrivals: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load arrivals',
      });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
