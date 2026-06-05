import { StatusPill } from "@/components/shared/StatusPill";
import type { DiagnosticItem as DiagnosticItemType } from "@/lib/api";

interface DiagnosticListProps {
  diagnosticItem: DiagnosticItemType[];
}

export function DiagnosticList({ diagnosticItem }: DiagnosticListProps) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-card p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Diagnostic List
      </h3>

      <div className="overflow-x-auto w-full">
        {/* Table Header */}
        <div className="grid w-full grid-cols-[1fr_1.5fr_1fr] gap-4 px-4 py-2.5 bg-gray-50 rounded-[20px] mb-2">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Problem/Diagnosis
          </span>
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Description
          </span>
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Status
          </span>
        </div>

        {/* Table Rows */}
        <div className="divide-y w-full divide-gray-50">
          {diagnosticItem?.map((diagnosis, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-900">{diagnosis.name}</span>
              <span className="text-sm text-gray-500">
                {diagnosis.description}
              </span>
              <div>
                <StatusPill status={diagnosis.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
