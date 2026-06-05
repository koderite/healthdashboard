import { VitalSignCard } from '@/components/shared/VitalSignCard';
import type { DiagnosisHistory as DiagnosisHistoryType } from '@/lib/api';
import { RespiratoryRateIcon, TemperatureIcon, HeartBpmIcon } from '@/assets/icons';

interface VitalSignsCardsProps {
  diagnosisHistory: DiagnosisHistoryType[];
}

export function VitalSignsCards({ diagnosisHistory }: VitalSignsCardsProps) {
  // Get the latest reading
  const latest = diagnosisHistory[diagnosisHistory.length - 1];

  if (!latest) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <VitalSignCard
        vitalSign={{
          value: latest.respiratory_rate.value,
          unit: 'bpm',
          status: latest.respiratory_rate.levels,
          label: 'Respiratory Rate',
        }}
        iconSrc={RespiratoryRateIcon}
        bgColor="#E0F3FA"
      />
      <VitalSignCard
        vitalSign={{
          value: latest.temperature.value,
          unit: '°F',
          status: latest.temperature.levels,
          label: 'Temperature',
        }}
        iconSrc={TemperatureIcon}
        bgColor="#FFE6E9"
      />
      <VitalSignCard
        vitalSign={{
          value: latest.heart_rate.value,
          unit: 'bpm',
          status: latest.heart_rate.levels,
          label: 'Heart Rate',
        }}
        iconSrc={HeartBpmIcon}
        bgColor="#FFE6F1"
      />
    </div>
  );
}