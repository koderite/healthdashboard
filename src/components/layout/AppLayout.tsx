import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, RotateCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PatientListPanel } from './PatientListPanel';
import { PatientProfilePanel } from './PatientProfilePanel';
import { SectionCard } from '@/components/shared/SectionCard';
import { DiagnosisHistory } from '@/components/sections/DiagnosisHistory';
import { VitalSignsCards } from '@/components/sections/VitalSignsCards';
import { DiagnosticList } from '@/components/sections/DiagnosticList';
import { LabResults } from '@/components/sections/LabResults';
import { usePatients } from '@/hooks/usePatients';
import { useActivePatient } from '@/hooks/useActivePatient';
import { cn } from '@/lib/utils';

function PatientsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-4 xl:mt-8 xl:flex-row xl:gap-6" aria-hidden="true">
      <div className="w-full xl:w-[clamp(240px,20vw,340px)] xl:shrink-0">
        <div className="card-base">
          <div className="card-header">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="px-4 py-3">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="space-y-1 px-2 pb-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 px-3 py-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 xl:gap-8">
        <SectionCard className="w-full">
          <Skeleton className="mb-5 h-7 w-52" />
          <Skeleton className="mb-5 h-[260px] w-full rounded-xl" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-2xl" />
            ))}
          </div>
        </SectionCard>
        <SectionCard className="w-full">
          <Skeleton className="mb-4 h-6 w-40" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </SectionCard>
      </div>

      <div className="flex w-full flex-col gap-4 xl:w-[clamp(240px,20vw,340px)] xl:shrink-0 xl:gap-6">
        <div className="card-base card-padding">
          <div className="flex flex-col items-center gap-3 pb-4">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3.5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-4 sm:p-6">
          <Skeleton className="mb-4 h-6 w-28" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppLayout() {
  const { data: patients, isLoading, isError, error, refetch, isFetching } = usePatients();
  const { activePatient, activePatientName, selectPatient } = useActivePatient(patients);

  if (isLoading) {
    return <PatientsSkeleton />;
  }

  if (isError) {
    return (
      <div role="alert" className="card-base mt-4 items-center gap-3 p-10 text-center xl:mt-8">
        <AlertCircle className="h-10 w-10 text-red-400" aria-hidden="true" />
        <div>
          <h2 className="text-heading">Unable to load patients</h2>
          <p className="text-body-secondary mt-1">
            {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="mt-2 h-10 rounded-full bg-[#01F0D0] px-6 text-sm font-bold text-navy hover:bg-[#01F0D0]/90"
        >
          <RotateCw className={cn('h-4 w-4', isFetching && 'animate-spin')} aria-hidden="true" />
          {isFetching ? 'Retrying…' : 'Retry'}
        </Button>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="card-base mt-4 items-center justify-center gap-2 p-12 text-center xl:mt-8">
        <Users className="h-10 w-10 text-gray-300" aria-hidden="true" />
        <p className="text-heading">No patients found</p>
        <p className="text-body-secondary">There are no patient records to display yet.</p>
      </div>
    );
  }

  if (!activePatient) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-4 xl:mt-8 xl:flex-row xl:gap-6">
      <motion.aside
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full xl:w-[clamp(240px,20vw,340px)] xl:shrink-0"
      >
        <PatientListPanel
          patients={patients}
          activePatientName={activePatientName}
          onSelectPatient={selectPatient}
        />
      </motion.aside>

      <div className="flex min-w-0 flex-1 flex-col gap-4 xl:gap-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePatientName}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex flex-col gap-4 xl:gap-8"
          >
            <SectionCard className="w-full">
              <h2 className="text-heading mb-5">Diagnosis History</h2>
              <DiagnosisHistory diagnosisHistory={activePatient.diagnosis_history} />
              <VitalSignsCards diagnosisHistory={activePatient.diagnosis_history} />
            </SectionCard>
            <SectionCard className="w-full">
              <DiagnosticList diagnosticItem={activePatient.diagnostic_list} />
            </SectionCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.aside
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
        className="flex w-full flex-col gap-4 xl:w-[clamp(240px,20vw,340px)] xl:shrink-0 xl:gap-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePatientName}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex flex-col gap-4 xl:gap-6"
          >
            <PatientProfilePanel patient={activePatient} />
            <LabResults labResults={activePatient.lab_results} />
          </motion.div>
        </AnimatePresence>
      </motion.aside>
    </div>
  );
}
