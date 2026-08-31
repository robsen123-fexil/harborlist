const SLIP_SLOTS = [
  { id: 'A-01', label: 'A1', occupied: true },
  { id: 'A-02', label: 'A2', occupied: false },
  { id: 'A-03', label: 'A3', occupied: true },
  { id: 'B-01', label: 'B1', occupied: false },
  { id: 'B-02', label: 'B2', occupied: false },
  { id: 'B-03', label: 'B3', occupied: true },
  { id: 'C-01', label: 'C1', occupied: false },
  { id: 'C-02', label: 'C2', occupied: true },
];

export function SlipMapStrip() {
  return (
    <div className="slip-map-strip" data-testid="slip-map-strip" aria-label="Marina slip overview">
      <span className="slip-map-strip__label">Slip map</span>
      <div className="slip-map-strip__slots">
        {SLIP_SLOTS.map((slot) => (
          <div
            key={slot.id}
            className={`slip-slot ${slot.occupied ? 'slip-slot--occupied' : 'slip-slot--open'}`}
            data-testid={`slip-slot-${slot.id}`}
            title={slot.occupied ? `${slot.label} occupied` : `${slot.label} available`}
          >
            {slot.label}
          </div>
        ))}
      </div>
    </div>
  );
}
