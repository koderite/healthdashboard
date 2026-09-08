import { useQuery } from '@tanstack/react-query';
import { fetchPatients, type Patient } from '@/lib/api';

export function usePatients() {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}