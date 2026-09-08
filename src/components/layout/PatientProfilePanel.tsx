import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { InfoRow } from '@/components/shared/InfoRow';
import type { Patient } from '@/lib/api';
import { BirthIcon, FemaleIcon, PhoneIcon, InsuranceIcon } from '@/assets/icons';

interface PatientProfilePanelProps {
  patient: Patient;
}

const COLLAPSED_ROWS = 3;

function formatDateOfBirth(dateStr: string) {
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function PatientProfilePanel({ patient }: PatientProfilePanelProps) {
  const [showAll, setShowAll] = useState(false);

  const infoRows = useMemo(
    () => [
      { id: 'dob', iconSrc: BirthIcon, label: 'Date of Birth', value: formatDateOfBirth(patient.date_of_birth) },
      { id: 'gender', iconSrc: FemaleIcon, label: 'Gender', value: patient.gender },
      { id: 'phone', iconSrc: PhoneIcon, label: 'Contact Info', value: patient.phone_number },
      { id: 'emergency', iconSrc: PhoneIcon, label: 'Emergency Contacts', value: patient.emergency_contact },
      { id: 'insurance', iconSrc: InsuranceIcon, label: 'Insurance Provider', value: patient.insurance_type },
    ],
    [patient]
  );

  const visibleRows = showAll ? infoRows : infoRows.slice(0, COLLAPSED_ROWS);
  const hasMore = infoRows.length > COLLAPSED_ROWS;

  return (
    <div className="card-base card-padding w-full">
      <div className="flex flex-col items-center pb-6 pt-2">
        <div className="max-w-[200px]">
          <img
            src={patient.profile_picture}
            alt={patient.name}
            loading="lazy"
            className="profile-avatar mb-4"
          />
        </div>
        <h2 className="text-subtitle">{patient.name}</h2>
      </div>

      <div className="space-y-4 pb-2">
        {visibleRows.map((row) => (
          <InfoRow key={row.id} iconSrc={row.iconSrc} label={row.label} value={row.value} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
          className="cta-button mx-auto mt-4 flex h-11 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-[#01F0D0] text-sm font-bold text-navy"
        >
          {showAll ? 'Show Less' : 'Show All Information'}
          {showAll ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}