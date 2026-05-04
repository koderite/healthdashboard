import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Patient } from '@/lib/api';

interface PatientListItemProps {
  patient: Patient;
  isActive: boolean;
  onClick: () => void;
}

export function PatientListItem({ patient, isActive, onClick }: PatientListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn('patient-item', isActive && 'patient-item-active')}
    >
<img
          src={patient.profile_picture}
          alt={patient.name}
        className="patient-avatar"
      />
      <div className="flex-1 min-w-0">
        <p className="text-body-emphasized truncate">
          {patient.name}
        </p>
        <p className="patient-meta">
          {patient.gender}, {patient.age}
        </p>
      </div>
      <MoreHorizontal className="w-4 h-4 flex-shrink-0" />
    </button>
  );
}
