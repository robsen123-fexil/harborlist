interface MooringSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MooringSearch({ value, onChange }: MooringSearchProps) {
  return (
    <div className="mooring-search">
      <label htmlFor="mooring-search-input">Search vessels</label>
      <input
        id="mooring-search-input"
        type="search"
        placeholder="Vessel or captain name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
