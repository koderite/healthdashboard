import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PatientListItem } from '@/components/shared/PatientListItem';
import type { Patient } from '@/lib/api';

interface PatientListPanelProps {
  patients: Patient[];
  activePatientName: string;
  onSelectPatient: (name: string) => void;
}

export function PatientListPanel({
  patients,
  activePatientName,
  onSelectPatient,
}: PatientListPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPatients = useMemo(
    () =>
      normalizedQuery
        ? patients.filter((patient) => patient.name.toLowerCase().includes(normalizedQuery))
        : patients,
    [patients, normalizedQuery]
  );

  return (
    <div className="card-base w-full">
      <div className="card-header">
        <h2 className="text-heading">Patients</h2>
        <span className="text-xs text-gray-400" aria-live="polite">
          {filteredPatients.length} of {patients.length}
        </span>
      </div>

      <div className="px-4 py-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search patients..."
            aria-label="Search patients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm text-navy placeholder:text-gray-400 transition-colors duration-150 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-navy"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <div
          role="listbox"
          aria-label="Patient list"
          className="flex-1 overflow-y-auto scrollbar-custom"
          style={{ maxHeight: 'clamp(300px, 50vh, 1054px)' }}
        >
          {filteredPatients.map((patient) => (
            <PatientListItem
              key={patient.name}
              patient={patient}
              isActive={patient.name === activePatientName}
              onSelect={onSelectPatient}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 px-4 pb-8 pt-4 text-center">
          <Search className="h-8 w-8 text-gray-300" aria-hidden="true" />
          <p className="text-sm font-semibold text-navy">No patients found</p>
          <p className="text-xs text-gray-500">
            No results for &ldquo;{searchQuery.trim()}&rdquo;. Try a different name.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-1 text-xs font-bold text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}