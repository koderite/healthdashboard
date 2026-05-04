interface StatusPillProps {
  status: 'Under Observation' | 'Cured' | 'Inactive';
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className="status-pill">
      {status}
    </span>
  );
}
