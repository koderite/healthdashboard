import type { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon?: LucideIcon;
  iconSrc?: string;
  label: string;
  value: string;
}

export function InfoRow({ icon: Icon, iconSrc, label, value }: InfoRowProps) {
  return (
    <div className="info-row">
      {iconSrc ? (
        <img src={iconSrc} alt="" loading="lazy" className="info-icon" />
      ) : Icon ? (
        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
      ) : null}
      <div className="min-w-0">
        <p className="info-label">{label}</p>
        <p className="info-value break-words">{value}</p>
      </div>
    </div>
  );
}
