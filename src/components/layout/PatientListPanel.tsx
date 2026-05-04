import { useState } from 'react';
import SearchFieldIcon from '@/assets/icons/ui/searchField.svg';
import type { Patient } from '@/lib/api';

interface PatientListPanelProps {
  patients: Patient[];
  activePatientName: string;
  onSelectPatient: (name: string) => void;
}

export function PatientListPanel({ patients, activePatientName, onSelectPatient }: PatientListPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full mb-8 card-base">
      <div className="card-header">
        <h2 className="text-heading">Patients</h2>
        <button className="icon-btn">
          <img src={SearchFieldIcon} alt="Search" width={18} height={18} />
        </button>
      </div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom" style={{ maxHeight: '1054px' }}>
        {filteredPatients.map((patient) => (
          <div
            key={patient.name}
            className={`patient-item ${patient.name === activePatientName ? 'patient-item-active' : ''}`}
            onClick={() => onSelectPatient(patient.name)}
            role="button"
            tabIndex={0}
          >
            <img
              src={patient.profile_picture}
              alt={patient.name}
              className="patient-avatar"
            />
            <div className="flex-1 min-w-0">
              <p className="text-body-emphasized truncate">
                {patient.name}
              </p>
              <p className="patient-meta">
                {patient.gender}, {patient.age}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}