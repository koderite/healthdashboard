
export interface VitalSign {
  value: number;
  unit: string;
  status: string;
  label: string;
  abnormal?: boolean;
}

export interface VitalSigns {
  respiratoryRate: VitalSign;
  temperature: VitalSign;
  heartRate: VitalSign;
}



