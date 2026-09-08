import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { Patient } from '@/lib/api';

interface PatientListItemProps {
  patient: Patient;
  isActive: boolean;
  onSelect: (name: string) => void;
}

export const PatientListItem = memo(function PatientListItem({
  patient,
  isActive,
  onSelect,
}: PatientListItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(patient.name)}
      className={cn('patient-item', isActive && 'patient-item-active')}
    >
      <img
        src={patient.profile_picture}
        alt=""
        loading="lazy"
        className="patient-avatar"
      />
      <span className="min-w-0 flex-1 text-left">
        <span className="text-body-emphasized block truncate">{patient.name}</span>
        <span className="patient-meta block truncate">
          {patient.gender}, {patient.age}
        </span>
      </span>
    </button>
  );
});