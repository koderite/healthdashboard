import { useCallback, useMemo, useState } from 'react';
import type { Patient } from '@/lib/api';

const DEFAULT_PATIENT_NAME = 'Jessica Taylor';

/**
 * Tracks the actively selected patient with a safe fallback:
 * - the patient selected by the user
 * - otherwise the default patient (when present)
 * - otherwise the first patient in the list (e.g. on initial load)
 */
export function useActivePatient(patients: Patient[] | undefined) {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const activePatient = useMemo(() => {
    if (!patients || patients.length === 0) return undefined;
    return (
      patients.find((patient) => patient.name === selectedName) ??
      patients.find((patient) => patient.name === DEFAULT_PATIENT_NAME) ??
      patients[0]
    );
  }, [patients, selectedName]);

  const selectPatient = useCallback((name: string) => {
    setSelectedName(name);
  }, []);

  return {
    activePatient,
    activePatientName: activePatient?.name ?? '',
    selectPatient,
  } as const;
}
