import type { MooringType } from '@/types/mooring';

const TYPE_CHIPS: { value: MooringType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'slip', label: 'Slip' },
  { value: 'mooring', label: 'Mooring' },
  { value: 'dockside', label: 'Dockside' },
  { value: 'transient', label: 'Transient' },
];

interface TypeChipBarProps {
  value: MooringType | 'all';
  onChange: (value: MooringType | 'all') => void;
}

export function TypeChipBar({ value, onChange }: TypeChipBarProps) {
  return (
    <div className="type-chip-bar" role="group" aria-label="Filter by mooring type">
      {TYPE_CHIPS.map((chip) => (
        <button
          key={chip.value}
          type="button"
          className={`type-chip ${value === chip.value ? 'type-chip--active' : ''}`}
          aria-pressed={value === chip.value}
          data-testid={`type-chip-${chip.value}`}
          onClick={() => onChange(chip.value)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
