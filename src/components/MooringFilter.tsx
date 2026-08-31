import type { MooringType } from '@/types/mooring';

const MOORING_TYPES: { value: MooringType | 'all'; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'slip', label: 'Slip' },
  { value: 'mooring', label: 'Mooring buoy' },
  { value: 'dockside', label: 'Dockside' },
  { value: 'transient', label: 'Transient' },
];

interface MooringFilterProps {
  value: MooringType | 'all';
  onChange: (value: MooringType | 'all') => void;
}

export function MooringFilter({ value, onChange }: MooringFilterProps) {
  return (
    <div className="mooring-filter">
      <label htmlFor="mooring-type-filter">Mooring type</label>
      <select
        id="mooring-type-filter"
        aria-label="Mooring type"
        value={value}
        onChange={(e) => onChange(e.target.value as MooringType | 'all')}
      >
        {MOORING_TYPES.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
