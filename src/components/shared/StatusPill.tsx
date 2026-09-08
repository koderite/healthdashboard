const STATUS_STYLES: Record<string, string> = {
  'Under Observation': 'bg-[#E0F3FA]',
  Cured: 'bg-[#D8FCF7]',
  Inactive: 'bg-[#F6F6F6]',
};

interface StatusPillProps {
  status: 'Under Observation' | 'Cured' | 'Inactive';
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={`status-pill rounded-full ${STATUS_STYLES[status] ?? 'bg-gray-100'}`}>
      {status}
    </span>
  );
}
