import axios from "axios";

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const api = axios.create({
  baseURL: API_URL,
  auth: {
    username: "coalition",
    password: "skills-test",
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BloodPressure {
  systolic: { value: number; levels: string };
  diastolic: { value: number; levels: string };
}

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: { value: number; levels: string };
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
}

export interface DiagnosticItem {
  name: string;
  description: string;
  status: "Under Observation" | "Cured" | "Inactive";
}

export type LabResult = string;

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosticItem[];
  lab_results: string[];
}

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>("");
  return response.data;
};

export default api;
