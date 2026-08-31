interface SelectionTrayProps {
  count: number;
}

export function SelectionTray({ count }: SelectionTrayProps) {
  if (count === 0) return null;

  return (
    <div className="selection-tray" data-testid="selection-tray" role="status">
      {count} request{count === 1 ? '' : 's'} selected for assignment
    </div>
  );
}
