import { motion } from "framer-motion";
import { useState } from "react";
import { PatientListPanel } from "./PatientListPanel";
import { PatientProfilePanel } from "./PatientProfilePanel";
import { SectionCard } from "@/components/shared/SectionCard";
import { DiagnosisHistory } from "@/components/sections/DiagnosisHistory";
import { VitalSignsCards } from "@/components/sections/VitalSignsCards";
import { LabResults } from "@/components/sections/LabResults";
import { DiagnosticList } from "../sections/DiagnosticList";
import { usePatients } from "@/hooks/usePatients";

export function AppLayout() {
  const { data: patients, isLoading, error } = usePatients();
  const [activePatientName, setActivePatientName] = useState<string>('Jessica Taylor');

  const activePatient = patients?.find((p) => p.name === activePatientName) || patients?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading patients: {error.message}</div>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy">No patients found</div>
      </div>
    );
  }

  if (!activePatient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy">Loading...</div>
      </div>
    );
  }

  const handleSelectPatient = (name: string) => {
    setActivePatientName(name);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
        className="w-full xl:w-[clamp(240px,20vw,340px)] xl:flex-shrink-0 mt-4 xl:mt-8"
      >
        <PatientListPanel patients={patients} activePatientName={activePatient.name} onSelectPatient={handleSelectPatient} />
      </motion.div>

      <div className="flex flex-col gap-4 xl:gap-8 xl:mt-8 flex-1 min-w-0">
        <SectionCard className="w-full">
          <h2 className="text-heading mb-5">Diagnosis History</h2>
          <DiagnosisHistory diagnosisHistory={activePatient.diagnosis_history} />
          <VitalSignsCards diagnosisHistory={activePatient.diagnosis_history} />
        </SectionCard>
        <SectionCard className="w-full">
          <DiagnosticList diagnosticItem={activePatient.diagnostic_list} />
        </SectionCard>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.25 }}
        className="flex flex-col gap-4 xl:gap-6 xl:mt-[18px] w-full xl:w-[clamp(240px,20vw,340px)] xl:flex-shrink-0"
      >
        <PatientProfilePanel patient={activePatient} />
        <LabResults labResults={activePatient.lab_results} />
      </motion.div>
    </div>
  );
}
