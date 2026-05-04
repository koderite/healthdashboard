import { cn } from '@/lib/utils';
import type { VitalSign } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownIcon } from '@/assets/icons';

interface VitalSignCardProps {
  vitalSign: VitalSign;
  icon?: LucideIcon;
  iconSrc?: string;
  iconColor?: string;
  bgColor?: string;
}

export function VitalSignCard({ vitalSign, icon: Icon, iconSrc, iconColor, bgColor }: VitalSignCardProps) {
  return (
    <div className="vital-card" style={{ background: bgColor }}>
      <div className="flex items-start justify-start mb-3">
        {iconSrc ? (
          <img src={iconSrc} alt="" className="vital-icon" />
        ) : Icon && (
          <Icon className={cn('w-10 h-10', iconColor)} />
        )}
      </div>
      <p className="text-body-emphasized mb-2">{vitalSign.label}</p>
      <div className="mb-2">
        <span className="vital-value">{vitalSign.value}</span>
        <span className="vital-unit">{vitalSign.unit}</span>
      </div>
      <div className="flex items-center gap-1">
        {vitalSign.abnormal ? (
          <img src={ArrowDownIcon} alt="" className="vital-indicator" />
        ) : null}
        <span className="vital-status">{vitalSign.status}</span>
      </div>
    </div>
  );
}
