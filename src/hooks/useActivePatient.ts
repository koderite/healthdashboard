import { useState, useCallback } from 'react';

export function useActivePatient(defaultPatientId: string = 'jessica-taylor') {
  const [activePatientId, setActivePatientId] = useState<string>(defaultPatientId);

  const selectPatient = useCallback((patientId: string) => {
    setActivePatientId(patientId);
  }, []);

  return {
    activePatientId,
    selectPatient,
  };
}
