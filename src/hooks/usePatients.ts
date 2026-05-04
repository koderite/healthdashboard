import { useQuery } from '@tanstack/react-query';
import { fetchPatients, type Patient } from '@/lib/api';

export const usePatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: async () => {
      const data = await fetchPatients();
      console.log('API Response:', data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const usePatientByName = (patients: Patient[] | undefined, name: string) => {
  return patients?.find((p) => p.name === name);
};