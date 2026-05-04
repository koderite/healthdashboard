import DownloadIcon from "@/assets/icons/ui/download-fill.svg";
import type { LabResult as LabResultType } from "@/lib/api";

interface LastResultProps {
  labResults: LabResultType[];
}

export function LabResults({ labResults }: LastResultProps) {
  return (
    <div
      className="card-base p-6"
      style={{ maxWidth: "367px", maxHeight: "296px", overflowY: "hidden" }}
    >
      <h3 className="text-heading mb-4">Lab Results</h3>

      <div
        className="divide-y divide-gray-100 scrollbar-thin"
        style={{ maxHeight: "220px", overflowY: "auto" }}
      >
        {labResults.map((result, id) => (
          <div
            key={id}
            className="flex items-center justify-between py-3 px-2 transition-colors duration-150 hover:bg-gray-50 rounded-lg group cursor-pointer"
          >
            <span className="text-item">{result}</span>
            <img
              src={DownloadIcon}
              alt="Download"
              width={20}
              height={20}
              className="text-gray-400 transition-all duration-150 group-hover:text-primary group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
