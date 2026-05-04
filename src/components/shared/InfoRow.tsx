import type { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon?: LucideIcon;
  iconSrc?: string;
  label: string;
  value: string;
}

export function InfoRow({ icon: Icon, iconSrc, label, value }: InfoRowProps) {
  return (
    <div className="info-row mb-6">
      {iconSrc ? (
        <img src={iconSrc} alt="" className="info-icon mt-0.5" />
      ) : Icon ? (
        <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
      ) : null}
      <div>
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );
}
