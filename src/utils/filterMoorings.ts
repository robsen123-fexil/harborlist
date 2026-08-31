import type { MooringRequest, MooringFilters } from '@/types/mooring';

export function filterMoorings(
  moorings: MooringRequest[],
  filters: MooringFilters,
): MooringRequest[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return moorings.filter((mooring) => {
    const matchesType =
      filters.type === 'all' || mooring.mooringType === filters.type;

    const matchesQuery =
      normalizedQuery === '' ||
      mooring.vesselName.toLowerCase().includes(normalizedQuery) ||
      mooring.captain.toLowerCase().includes(normalizedQuery);

    return matchesType && matchesQuery;
  });
}

export function countByStatus(moorings: MooringRequest[]): Record<string, number> {
  return moorings.reduce<Record<string, number>>((acc, m) => {
    acc[m.status] = (acc[m.status] ?? 0) + 1;
    return acc;
  }, {});
}

export function countByType(moorings: MooringRequest[]): Record<string, number> {
  return moorings.reduce<Record<string, number>>((acc, m) => {
    acc[m.mooringType] = (acc[m.mooringType] ?? 0) + 1;
    return acc;
  }, {});
}
