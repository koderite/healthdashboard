import { motion } from "framer-motion";
import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
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
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <TopNavigation />
      </motion.div>

<motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="px-6 pb-6"
        >
          <div className="flex gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
              className="flex-shrink-0 mt-8 max-w-[367px]"
            >
              <PatientListPanel patients={patients} activePatientName={activePatient.name} onSelectPatient={handleSelectPatient} />
            </motion.div>

            <div className="flex mt-8 flex-col gap-8">
              <SectionCard width="766px">
                <h2 className="text-heading mb-5">Diagnosis History</h2>
                <DiagnosisHistory diagnosisHistory={activePatient.diagnosis_history} />
                <VitalSignsCards diagnosisHistory={activePatient.diagnosis_history} />
              </SectionCard>
              <SectionCard width="766px">
                <DiagnosticList diagnosticItem={activePatient.diagnostic_list} />
              </SectionCard>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.25 }}
              className="flex mt-[18px] flex-col gap-6"
            >
              <PatientProfilePanel patient={activePatient} />
              <LabResults labResults={activePatient.lab_results} />
            </motion.div>
          </div>
        </motion.main>
    </div>
  );
}