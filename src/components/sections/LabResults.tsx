import DownloadIcon from '@/assets/icons/ui/download-fill.svg';
import { FileSearch } from 'lucide-react';
import type { LabResult as LabResultType } from '@/lib/api';

interface LabResultsProps {
  labResults: LabResultType[];
}

export function LabResults({ labResults }: LabResultsProps) {
  return (
    <div className="card-base w-full p-4 sm:p-6">
      <h3 className="text-heading mb-4">Lab Results</h3>

      {labResults.length > 0 ? (
        <div
          className="divide-y divide-gray-100 overflow-y-auto scrollbar-custom"
          style={{ maxHeight: 220 }}
        >
          {labResults.map((result, id) => (
            <div
              key={`${result}-${id}`}
              className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 transition-colors duration-150 hover:bg-gray-50"
            >
              <span className="text-item min-w-0 truncate">{result}</span>
              <img
                src={DownloadIcon}
                alt=""
                loading="lazy"
                width={20}
                height={20}
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <FileSearch className="h-8 w-8 text-gray-300" aria-hidden="true" />
          <p className="text-sm text-gray-500">No lab results available</p>
        </div>
      )}
    </div>
  );
}
