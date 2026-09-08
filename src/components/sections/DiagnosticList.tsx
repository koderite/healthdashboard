import { Inbox } from 'lucide-react';
import { StatusPill } from '@/components/shared/StatusPill';
import type { DiagnosticItem as DiagnosticItemType } from '@/lib/api';

interface DiagnosticListProps {
  diagnosticItem: DiagnosticItemType[];
}

const headerCell = 'text-[11px] font-semibold uppercase tracking-wide text-gray-500';

export function DiagnosticList({ diagnosticItem }: DiagnosticListProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900">Diagnostic List</h3>

      {diagnosticItem?.length ? (
        <div className="mt-4 w-full overflow-x-auto">
          {/* Table header — hidden on mobile where rows stack */}
          <div className="mb-2 hidden w-full grid-cols-[1fr_1.5fr_1fr] gap-4 rounded-[20px] bg-gray-50 px-4 py-2.5 sm:grid">
            <span className={headerCell}>Problem/Diagnosis</span>
            <span className={headerCell}>Description</span>
            <span className={headerCell}>Status</span>
          </div>

          <div className="w-full divide-y divide-gray-50">
            {diagnosticItem.map((diagnosis, index) => (
              <div
                key={`${diagnosis.name}-${index}`}
                className="grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-lg px-4 py-3.5 transition-colors duration-150 hover:bg-gray-50 sm:grid-cols-[1fr_1.5fr_1fr] sm:gap-y-0"
              >
                <span className="order-1 text-sm font-medium text-gray-900">{diagnosis.name}</span>
                <div className="order-3 col-span-2 text-sm text-gray-500 sm:order-none sm:col-span-1">
                  {diagnosis.description}
                </div>
                <div className="order-2 sm:order-none">
                  <StatusPill status={diagnosis.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-8 text-center">
          <Inbox className="h-8 w-8 text-gray-300" aria-hidden="true" />
          <p className="text-sm text-gray-500">No diagnostic records available</p>
        </div>
      )}
    </div>
  );
}
